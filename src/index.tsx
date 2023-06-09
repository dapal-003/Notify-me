import { Injector, Logger, common, settings, types, webpack } from "replugged";
import {
  channelInterface,
  channelModInterface,
  getBlockedInterface,
  getChannelIdModuleInterface,
  getCurrentSidebarChannelIdModuleInterface,
  getGuildIdModuleInterface,
  getStatusModuleInterface,
  messageCreate,
  messageObj,
  settingsInterface,
  userInterface,
  userModuleInterface,
} from "./interfaces";
import { showNotification } from "./notification";
import settingsScreen from "./settings";
const inject = new Injector();
export const logger = Logger.plugin("NotifyMe");
let onMessageReceive: (e: messageCreate) => void;

export const channelModule = (await webpack.waitForModule(
  webpack.filters.byProps("getChannel", "getBasicChannel"),
)) as unknown as channelModInterface;
const userModule = (await webpack.waitForModule(
  webpack.filters.byProps("getCurrentUser", "getUser"),
)) as unknown as userModuleInterface;
const getChannelIdModule = (await webpack.waitForProps(
  "getChannelId",
  "getVoiceChannelId",
)) as unknown as getChannelIdModuleInterface;
const getGuildIdModule = (await webpack.waitForModule(
  webpack.filters.byProps("getGuildId", "getLastSelectedGuildId"),
)) as unknown as getGuildIdModuleInterface;
const getCurrentSidebarChannelIdModule = (await webpack.waitForProps(
  "getCurrentSidebarChannelId",
)) as unknown as getCurrentSidebarChannelIdModuleInterface;
const isBlockedModule = (await webpack.waitForModule(
  webpack.filters.byProps("isBlocked"),
)) as unknown as getBlockedInterface;
export const transitionModule = webpack.getBySource(
  "Routing/Utils",
) as unknown as types.ObjectExports;
export const transitionTo = webpack.getFunctionBySource(transitionModule, "if") as unknown as (
  destination: string,
) => {};
export const { exports: MessageConstructor } = webpack.getBySource(
  /\.compact.*\.zalgo.*\.childrenMessageContent/,
  { raw: true },
) as unknown as any;
const defaultFunction = webpack.getFunctionKeyBySource(
  MessageConstructor,
  /\.compact.*\.zalgo.*\.childrenMessageContent/,
) as unknown as string;
const getStatusModule = (await webpack.waitForModule(
  webpack.filters.byProps("getStatus", "getActivities"),
)) as unknown as getStatusModuleInterface;

const defaultSettings: Partial<settingsInterface> = {
  notifyGuilds: "",
  notifyChannels: "",
  notifyUsers: "",
  notifyKeywords: "",
  suppressGuilds: "",
  suppressChannels: "",
  suppressUsers: "",
  suppressKeywords: "",

  statusOverride: true, //true

  method: true,
  caseSensitive: false,
  highlightKeywords: true,

  mentionEveryone: true,
  mentionRoles: true,

  lurkedGuilds: false,
  managedChannels: false,
  simpleNotation: true,
  settingsCheck: { passed: true, message: "default init" },
};

const cfg = await settings.init<settingsInterface>("dev.Dapal.NotifyMe");

//cfg.delete("settingsCheck");

for (const [key, value] of Object.entries(defaultSettings)) {
  if (!cfg.has(key as never)) {
    logger.log(`Adding new settings ${key} with value`, value);
    cfg.set(key as never, value as never);
  }
}

export async function start(): Promise<void> {
  await common.fluxDispatcher.subscribe("MESSAGE_CREATE", onMessageReceive as never);

  inject.before(MessageConstructor, defaultFunction, (args: any) => {
    const { message } = args[0].childrenMessageContent.props;
    const simpleNotation = cfg.get("simpleNotation");
    const notifyKeywords = simpleNotation
      ? cfg.get("notifyKeywords")?.split(",")
      : JSON.parse(cfg.get("notifyKeywords"));

    if (cfg.get("highlightKeywords") && containsKeyword({ message }, notifyKeywords)) {
      //highlight messages with keywords if wanted
      let newArgs = args[0];
      newArgs.childrenMessageContent.props.message.mentioned = true;
      return newArgs;
    } else return args;
  });
}

onMessageReceive = (e) => {
  try {
    if (handleNotification(e, false, false)) {
      let key = Math.floor(Math.random() * 99999);
      showNotification({ key, messageObject: e.message });
    }
  } catch (error) {
    logger.log(error);
  }
};

/**
 * Check to see if the content of a given message contains any provided
 * keywords.
 * @param {messageObj} msg The message to check for keywords
 * @param {String[]} keywords Keywords to search for within the message
 * @returns {Boolean} Does the message contain a keyword?
 */
export function containsKeyword(messageEvent: messageCreate, keywords: string[]): boolean {
  let { message } = messageEvent;
  let { content } = message;
  if (!content) return false;
  const substring = cfg.get("method"); // keyword
  const caseSensitive = cfg.get("caseSensitive");

  if (!caseSensitive) {
    content = content.toLowerCase();
    keywords = keywords.map((keyword: string) => keyword.toLowerCase());
  }
  for (const keyword of keywords) {
    if (keyword === "") {
      continue;
    }

    if (!substring) {
      if (content.match(`\\b${keyword}\\b`)) {
        return true;
      }
    } else if (content.includes(keyword)) {
      return true;
    }
  }

  return false;
}

/**
 * Returns the keyword that activated the notification.
 * @param {messageObj} msg The message to check for keywords
 * @param {String[]} keywords Keywords to search for within the message
 * @returns {Boolean} Does the message contain a keyword?
 */
export function getActivationKeyword(message: messageObj, keywords: string[]): string {
  let { content } = message;
  if (!content) return "Something went wrong, please report to the developer";
  const substring = cfg.get("method"); // keyword
  const caseSensitive = cfg.get("caseSensitive");
  if (!caseSensitive) {
    content = content.toLowerCase();
    keywords = keywords.map((keyword: string) => keyword.toLowerCase());
  }
  for (const keyword of keywords) {
    if (keyword === "") {
      continue;
    }

    if (!substring) {
      if (content.match(`\\b${keyword}\\b`)) {
        return keyword;
      }
    } else if (content.includes(keyword)) {
      return keyword;
    }
  }

  return "Something went wrong, please report to the developer";
}

export function shouldNotifyBase(
  currentUser: userInterface,
  messageAuthor: userInterface,
): boolean {
  if (!messageAuthor.hasFlag(0)) {
    // Can't get the proper type here. From what I see flag 0 is the default flag, everyone has it, don't know if spammers do not have it.
    logger.log("has flag other than default");
    return false;
  }

  if (messageAuthor.id === currentUser.id) {
    return false;
  }
  if (isBlockedModule.isBlocked(messageAuthor.id)) {
    return false;
  }
  return true;
}

export function handleNotification(
  messagePackage: messageCreate,
  lostFocus: boolean,
  r: boolean,
): boolean {
  let { channelId } = messagePackage;
  lostFocus = lostFocus ?? true;
  r = r ?? false;

  let channel = channelModule.getChannel(channelId) as channelInterface;
  // handle thread creation
  if (messagePackage.type === "THREAD_STARTER_MESSAGES") {
    channel = channelModule.getChannel(channel?.parent_id) as channelInterface;
  }
  // ------
  // handle current user
  const currentUser = userModule.getCurrentUser() as userInterface;
  const messageAuthor = userModule.getUser(messagePackage.message.author?.id) as userInterface;
  // If the channel, current user, or message author aren't found then don't notify
  if (channel == null || currentUser == null || messageAuthor == null) {
    return false;
  }
  // ------
  // Check if user is blocked, or message is from the current user.
  if (!shouldNotifyBase(currentUser, messageAuthor)) {
    return false;
  }
  // ------
  // Get the channel the user is currently looking at, if it's the same as the channel the message is from don't
  // notify.
  const currentChannelId = getChannelIdModule.getChannelId(getGuildIdModule.getGuildId());
  const isCurrentChannel =
    currentChannelId === channel.id ||
    getCurrentSidebarChannelIdModule.getCurrentSidebarChannelId(currentChannelId);
  if (document.hasFocus() && isCurrentChannel) {
    return false;
  } else if (!lostFocus && isCurrentChannel) {
    return false;
  }
  // -------
  // get overwrite
  const currentStatus = getStatusModule.getStatus(); //Only gets "offline"

  const currentOverride = cfg.get("statusOverride");

  if (currentStatus === "dnd" && !currentOverride) return false; //If user is in DND and doesn't want notifications to go through, return now.

  // Used to determine if a message should go through when only custom notifications is
  // selected.
  let messageIsWanted = false;
  const simpleNotation = cfg.get("simpleNotation");
  const suppressGuilds = simpleNotation
    ? cfg.get("suppressGuilds")?.split(",")
    : JSON.parse(cfg.get("suppressGuilds"));
  const suppressChannels = simpleNotation
    ? cfg.get("suppressChannels")?.split(",")
    : JSON.parse(cfg.get("suppressChannels"));
  const suppressUsers = simpleNotation
    ? cfg.get("suppressUsers")?.split(",")
    : JSON.parse(cfg.get("suppressUsers"));
  const suppressKeywords = simpleNotation
    ? cfg.get("suppressKeywords")?.split(",")
    : JSON.parse(cfg.get("suppressKeywords"));

  if (!suppressGuilds) return false;
  if (!suppressChannels) return false;
  if (!suppressUsers) return false;
  if (!suppressKeywords) return false;

  if (suppressGuilds.includes(messagePackage.guildId)) {
    return false;
  }
  if (suppressChannels.includes(channel.id)) {
    return false;
  }
  if (suppressUsers.includes(messageAuthor.id)) {
    return false;
  }
  if (containsKeyword(messagePackage, suppressKeywords)) {
    return false;
  }

  const notifyGuilds = simpleNotation
    ? cfg.get("notifyGuilds")?.split(",")
    : JSON.parse(cfg.get("notifyGuilds"));
  const notifyChannels = simpleNotation
    ? cfg.get("notifyChannels")?.split(",")
    : JSON.parse(cfg.get("notifyChannels"));
  const notifyUsers = simpleNotation
    ? cfg.get("notifyUsers")?.split(",")
    : JSON.parse(cfg.get("notifyUsers"));
  const notifyKeywords = simpleNotation
    ? cfg.get("notifyKeywords")?.split(",")
    : JSON.parse(cfg.get("notifyKeywords"));

  if (notifyGuilds.includes(messagePackage.guildId)) {
    messageIsWanted = true;
  }
  if (notifyChannels.includes(channel.id)) {
    messageIsWanted = true;
  }
  if (notifyUsers.includes(messageAuthor.id)) {
    messageIsWanted = true;
  }
  if (containsKeyword(messagePackage, notifyKeywords)) {
    return true;
  } else if (messageIsWanted) {
    return true;
  }

  // override stuff and base notification deals

  // if (!currentOverride) {
  //   return false;
  // } else {

  // }

  // if (currentOverride && !messageIsWanted) {
  //   return false;
  // }

  // const suppressEveryone = userSettingsModule.isSuppressEveryoneEnabled(channel.getGuildId());
  // const suppressRoles = userSettingsModule.isSuppressRolesEnabled(channel.getGuildId());
  // const mentions = cfg.get("mentions", defaultSettings.mentions);

  // return isRawMessageMentioned({
  //   rawMessage: message,
  //   userId: currentUser.id,
  //   suppressEveryone: mentions.everyone ? suppressEveryone : true,
  //   suppressRoles: mentions.roles ? suppressRoles : true,
  // });
  //}

  // return {
  //   shouldNotifyBase,
  //   shouldNotify,
  //   getStatus
  // }

  return false;
}

export function getActivator(messagePackage: messageObj): string {
  const notifyGuilds = JSON.parse(cfg.get("notifyGuilds"));
  const notifyChannels = JSON.parse(cfg.get("notifyChannels"));
  const notifyUsers = JSON.parse(cfg.get("notifyUsers"));
  const notifyKeywords = JSON.parse(cfg.get("notifyKeywords"));

  let text = "This should never be seen. Please report to developer";

  if (notifyGuilds.includes(messagePackage.guild_id)) {
    text = `Notification from watched guild: ${
      common.guilds.getGuild(messagePackage.guild_id).name
    } (${messagePackage.guild_id})`;
  } else if (notifyChannels.includes(messagePackage.channel_id)) {
    text = `Notification from watched channel: ${channelModule.getChannel(
      messagePackage.channel_id,
    )} (${messagePackage.channel_id})`;
  } else if (notifyUsers.includes(messagePackage.author?.id)) {
    text = `Notification from watched user: ${messagePackage.author?.username}#${messagePackage.author?.discriminator} (${messagePackage.author?.id})`;
  } else {
    text = `Notification from watched keyword: ${getActivationKeyword(
      messagePackage,
      notifyKeywords,
    )}`;
  }
  return text;
}

export function stop(): void {
  inject.uninjectAll();
  common.fluxDispatcher.unsubscribe("MESSAGE_CREATE", onMessageReceive as types.AnyFunction);
}

export { cfg, settingsScreen as Settings };
