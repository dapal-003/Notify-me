import { Injector, Logger, common, settings, webpack } from "replugged";
import { channelInterface, messageCreate, settingsInterface, userInterface } from "./interfaces";
import settingsScreen from "./settings";
const inject = new Injector();
const logger = Logger.plugin("NotifyMe");
let onMessageRecive: (e: messageCreate) => void;

const channelModule = await webpack.waitForModule(
  webpack.filters.byProps("getChannel", "getBasicChannel"),
);
const userModule = await webpack.waitForModule(
  webpack.filters.byProps("getCurrentUser", "getUser"),
);
const getChannelIdModule = await webpack.waitForProps("getChannelId", "getVoiceChannelId");
const getGuildIdModule = await webpack.waitForModule(
  webpack.filters.byProps("getGuildId", "getLastSelectedGuildId"),
);
const getCurrentSidebarChannelIdModule = await webpack.waitForProps("getCurrentSidebarChannelId");
const getVoiceChannelIdModule = await webpack.waitForModule(
  webpack.filters.byProps("getChannelId", "getAveragePing"),
);
const isLurkingModule = await webpack.waitForModule(webpack.filters.byProps("isLurking"));
const isBlockedModule = await webpack.waitForModule(webpack.filters.byProps("isBlocked"));
const isMutedModule = await webpack.waitForModule(webpack.filters.byProps("isMuted", "hasJoined"));
const getStatusModule = await webpack.waitForModule(
  webpack.filters.byProps("getStatus", "getActivities"),
);
const userSettingsModule = await webpack.waitForModule(
  webpack.filters.byProps(
    "allowAllMessages",
    "isSuppressEveryoneEnabled",
    "isSuppressRolesEnabled",
  ),
);
// Crashes plugin
// const UserFlagsModule: any = await webpack.waitForModule(webpack.filters.byProps("UserFlags"));
// crashes plugin
// try {
// const UserFlagsModule: any = webpack.getByProps(["publicFlags"], { all: true });
// logger.log(UserFlagsModule);
// } catch (error) {
//   logger.log(error);
// }
// crashes plugin
// const MessageTypesModule: any = await webpack.waitForModule(
//   webpack.filters.byProps("MessageTypes", "UploadTypes"),
// );
//   logger.log(MessageTypesModule);
//crashes plugin
// const getChannelTypesModule: any = await webpack.waitForModule(
//   webpack.filters.byProps("THREAD_CHANNEL_TYPES", "GUILD_VOCAL_CHANNEL_TYPES"),
// );
//crashes plugin
// const computeThreadNotificationSettingModule: any = await webpack.waitForModule(
//   webpack.filters.byProps("computeThreadNotificationSetting"),
// );
//crashes plugin
// const ThreadMemberFlagsModule: any = await webpack.waitForModule(
//   webpack.filters.byProps("ThreadMemberFlags"),
// );
//Crashes plugin
// const mentionedModule: any = webpack.getBySource(".channel_id,mentionEveryone:", { all: true });
// logger.log(mentionedModule);
// const functionInModule = webpack.getFunctionBySource(mentionedModule, "rawMessage");
// logger.log(functionInModule);

const defaultSettings: Partial<settingsInterface> = {
  notifyGuilds: '"[""]"',
  notifyChannels: '"[""]"',
  notifyUsers: '"[""]"',
  notifyKeywords: '"[""]"',
  supressGuilds: '"[""]"',
  supressChannels: '"[""]"',
  supressUsers: '"[""]"',
  supressKeywords: '"[""]"',

  statusOverride: true, //true

  method: true,
  caseSensitive: false, //false
  highlightKeywords: true, // true

  mentionEveryone: true, //true
  mentionRoles: true, // true

  lurkedGuilds: false, //false
  managedChannels: false, //false
};

const cfg = await settings.init<settingsInterface>("dev.Dapal.NotifyMe");

for (const [key, value] of Object.entries(defaultSettings)) {
  if (!cfg.has(key as never)) {
    console.log(`Adding new settings ${key} with value`, value);
    cfg.set(key as never, value as never);
  }
}
logger.log(cfg.all());
export async function start(): Promise<void> {
  common.fluxDispatcher.subscribe("MESSAGE_CREATE", onMessageRecive as never);
}

onMessageRecive = (e) => {
  try {
    if (handleNotification(e, false, false)) {
      logger.log("Spawn notification:");
      logger.log(e);
      if (!e.message.content) {
        common.toast.toast(
          `${e.message.author.display_name ?? e.message.author.username} uploaded: ${
            e.message.content
          }`,
          common.toast.Kind.MESSAGE,
        );
      } else {
        common.toast.toast(
          `${e.message.author.display_name ?? e.message.author.username} Said: ${
            e.message.content
          }`,
          common.toast.Kind.MESSAGE,
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Check to see if the content of a given message contains any provided
 * keywords.
 * @param {messageObj} msg The message to check for keywords
 * @param {String[]} keywords Keywords to search for within the message
 * @returns {Boolean} Does the message contain a keyword?
 */
export function containsKeyword(messageEvent: messageCreate, keywords: string): boolean {
  let { message } = messageEvent;
  let { content } = message;
  if (!content) return false;
  const keywordDetection = cfg.get("method"); // keyword
  const caseSensitive = cfg.get("caseSensitive");
  const keywordsObject = JSON.parse(keywords);
  if (!caseSensitive) {
    content = content.toLowerCase();
    keywords = keywordsObject.map((keyword: string) => keyword.toLowerCase());
  }
  for (const keyword of keywordsObject) {
    if (keyword === "") {
      continue;
    }
    //logger.log(keyword);

    if (!keywordDetection) {
      if (content.match(`(^|[\\s/?.,'":()\\-_\\*!\`])${keyword}([\\s/?.,'":()\\-_\\*!\`]|$)`)) {
        return true;
      }
    } else if (content.includes(keyword)) {
      return true;
    }
  }

  return false;
}

export function shouldNotifyBase(
  currentUser: userInterface,
  messageAuthor: userInterface,
  channel: channelInterface,
  r?: boolean,
  o?: boolean,
): boolean {
  //Set variable defaults
  r = r ?? false;
  o = o ?? false;
  //logger.log(messageAuthor);
  if (!messageAuthor.hasFlag(0)) {
    // Can't get the proper type here. From what I see flag 0 is the default flag, everyone has it, don't know if sammers do not have it.
    logger.log("has flag other than default");
    return false;
  }

  if (messageAuthor.id === currentUser.id) {
    return false;
  }
  if (isBlockedModule.isBlocked(messageAuthor.id)) {
    return false;
  }
  // This is where Discord's status check would normally be, but we check later on to account for better
  // customization.
  // if (!r && getStatus() === StatusTypes.DND) {
  //   return false
  // }
  // if (!o && allowNoMessages(channel)) {
  //   return false
  // }
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

  let channel = channelModule.getChannel(channelId);
  // handle thread creation
  if (messagePackage.type === "THREAD_STARTER_MESSAGES") {
    channel = channelModule.getChannel(channel?.parent_id);
  }
  // ------
  // handle current user
  const currentUser = userModule.getCurrentUser();
  const messageAuthor = userModule.getUser(messagePackage.message.author.id);
  // If the channel, current user, or message author aren't found then don't notify
  if (channel === null || currentUser === null || messageAuthor === null) {
    logger.log("Can't find first");
    return false;
  }
  // ------
  // Check if the channel is muted, user is blocked, or message is from the current user.
  if (!shouldNotifyBase(currentUser, messageAuthor, channel, r)) {
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
  // const currentStatus = getStatusModule.getStatus(); //Only gets "offline"

  //const currentOverride = cfg.get("statusOverride");
  // Used to determine if a message should go through when only custom notifications is
  // selected.
  let messageIsWanted = false;

  const supressGuilds = JSON.parse(cfg.get("supressGuilds"));
  const supressChannels = JSON.parse(cfg.get("supressChannels"));
  const supressUsers = JSON.parse(cfg.get("supressUsers"));
  const supressKeywords = JSON.parse(cfg.get("supressKeywords"));
  if (!supressGuilds) return false;
  if (!supressChannels) return false;
  if (!supressUsers) return false;
  if (!supressKeywords) return false;

  if (supressGuilds.includes(messagePackage.guildId)) {
    return false;
  }
  if (supressChannels.includes(channel.id)) {
    return false;
  }
  if (supressUsers.includes(messageAuthor.id)) {
    return false;
  }
  if (containsKeyword(messagePackage, supressKeywords)) {
    return false;
  }
  const notifyGuilds = JSON.parse(cfg.get("notifyGuilds"));
  const notifyChannels = JSON.parse(cfg.get("notifyChannels"));
  const notifyUsers = JSON.parse(cfg.get("notifyUsers"));
  const notifyKeywords = JSON.parse(cfg.get("notifyKeywords"));

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

export function stop(): void {
  inject.uninjectAll();
  common.fluxDispatcher.unsubscribe("MESSAGE_CREATE", onMessageRecive as any);
}
export { cfg, settingsScreen as Settings };
