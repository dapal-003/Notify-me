/* eslint-disable @typescript-eslint/naming-convention */
import { types } from "replugged";
export interface messageObj {
  activity?: unknown;
  application?: unknown;
  applicationId?: unknown;
  attachments: attachment[];
  author: author;
  blocked?: boolean;
  bot?: boolean;
  call?: unknown;
  channel_id: string;
  codeLinks?: unknown[];
  colorString?: unknown;
  components?: object[];
  content: string;
  customRenderedContent?: unknown;
  edited_timestamp?: null | string;
  embeds: object[];
  flags: number;
  giftCodes: unknown[];
  guild_id?: string;
  id: string;
  interaction?: unknown;
  interactionData?: unknown;
  interactionError?: unknown;
  isSearchHit?: boolean;
  loggingName: unknown;
  member: member;
  mentionChannels?: unknown[];
  mention_everyone: boolean;
  mention_roles: object[];
  mentions: author[];
  messageReference?: null;
  nick?: unknown;
  nonce?: unknown;
  pinned: boolean;
  reactions?: unknown[];
  referralTrialOfferId?: unknown;
  roleSubscriptionData?: unknown;
  state?: string;
  stickerItems?: [];
  stickers?: [];
  referenced_message?: referenceMessage;
  message_reference?: messageReference;
  timestamp: string;
  tts: boolean;
  type: number;
  uploaderId?: unknown;
  webhookId?: unknown;
}
interface messageReference {
  channel_id: string;
  guild_id: string;
  message_id: string;
}
export interface referenceMessage {
  attachments: attachment[];
  author: author;
  channel_id: string;
  components: [];
  content: string;
  edited_timestamp: null | string;
  embeds: [];
  flags: number;
  id: string;
  mention_everyone: boolean;
  mention_roles: string[];
  mentions: [];
  pinned: boolean;
  timestamp: string;
  tts: boolean;
  type: number;
}
export interface author {
  avatar: null | string;
  avatarDecoration?: null | string;
  avatar_decoration?: null | string;
  discriminator: string;
  display_name: null | string;
  id: string;
  publicFlags?: number;
  public_flags?: number;
  username: string;
}
export interface member {
  avatar: null | string;
  communication_disabled_until: null | string;
  deaf: boolean;
  flags: number;
  joined_at: string;
  mute: boolean;
  nick: null | string;
  pending: boolean;
  premium_since: null | string;
  roles: string[];
}
export interface attachment {
  content_type: string;
  filename: string;
  height: number;
  id: string;
  proxy_url: string;
  size: string;
  url: string;
  width: number;
}
export interface settingsInterface {
  notifyGuilds?: string;
  notifyChannels?: string;
  notifyUsers?: string;
  notifyKeywords?: string;

  suppressGuilds?: string;
  suppressChannels?: string;
  suppressUsers?: string;
  suppressKeywords?: string;

  statusOverride?: boolean;

  method?: boolean;
  caseSensitive?: boolean;

  mentionEveryone?: boolean;
  mentionRoles?: boolean;

  highlightKeywords?: boolean;
  lurkedGuilds?: boolean;
  managedChannels?: boolean;
  simpleNotation?: boolean;
  settingsCheck?: settingsCheck;
}
export interface settingsCheck {
  passed: boolean;
  message: string;
}
export interface messageCreate {
  channelId?: string;
  guildId?: string;
  isPushNotification?: boolean;
  message: messageObj;
  optimistic?: boolean;
  type?: string;
}
export interface userInterface {
  avatar: string;
  avatarDecoration: null | string;
  bot: boolean;
  desktop: boolean;
  discriminator: string;
  email: null | string;
  flags: number;
  guildMemberAvatars: {
    [key: number]: string;
  };
  hasAnyStaffLevel?: undefined | string;
  hasBouncedEmail: boolean;
  hasFlag: types.AnyFunction;
  id: string;
  isStaff: types.AnyFunction;
  isStaffPersonal: types.AnyFunction;
  mfaEnabled: boolean;
  mobile: boolean;
  nsfwAllowed: undefined | boolean;
  personalConnectionId: null | string;
  phone: null | string;
  premiumType: undefined | number;
  premiumUsageFlags: number;
  publicFlags: number;
  purchasedFlags: number;
  system: boolean;
  username: string;
  verified: boolean;
  createdAt: Date;
  tag: string;
}
export interface channelInterface {
  application_id: undefined | string;
  defaultAutoArchiveDuration: undefined | string;
  defaultThreadRateLimitPerUser: undefined | string;
  flags_: number;
  guild_id: string;
  id: string;
  lastMessageId: string;
  lastPinTimestamp: string;
  memberListId: undefined | string;
  name: string;
  nsfw_: boolean;
  parent_id: string;
  permissionOverwrites_: undefined | string;
  position_: number;
  rateLimitPerUser_: number;
  topic_: string;
  type: number;
  version: undefined | string;
  accessPermissions: undefined | string;
  bitrate: number;
  flags: number;
  nsfw: boolean;
  permissionOverwrites: undefined | string;
  position: number;
  rateLimitPerUser: number;
  topic: string;
  userLimit: number;
}
export interface getBlockedInterface {
  getFriendIDs: types.AnyFunction;
  getNickname: types.AnyFunction;
  getPendingCount: types.AnyFunction;
  getRelationshipCount: types.AnyFunction;
  getRelationshipType: types.AnyFunction;
  getRelationships: types.AnyFunction;
  getSince: types.AnyFunction;
  getSinces: types.AnyFunction;
  initialize: types.AnyFunction;
  isBlocked: types.AnyFunction;
  isFriend: types.AnyFunction;
}
export interface channelModInterface {
  getAllThreadsForParent: types.AnyFunction;
  getBasicChannel: types.AnyFunction;
  getCachedChannelJsonForGuild: types.AnyFunction;
  getChannel: types.AnyFunction;
  getDMFromUserId: types.AnyFunction;
  getDMUserIds: types.AnyFunction;
  getGuildChannelsVersion: types.AnyFunction;
  getInitialOverlayState: types.AnyFunction;
  getMutableBasicGuildChannelsForGuild: types.AnyFunction;
  getMutableGuildChannelsForGuild: types.AnyFunction;
  getMutablePrivateChannels: types.AnyFunction;
  getPrivateChannelsVersion: types.AnyFunction;
  getSortedPrivateChannels: types.AnyFunction;
  hasChannel: types.AnyFunction;
  hasRestoredGuild: types.AnyFunction;
  initialize: types.AnyFunction;
  loadAllGuildAndPrivateChannelsFromDisk: types.AnyFunction;
}
export interface userModuleInterface {
  filter: types.AnyFunction;
  findByTag: types.AnyFunction;
  forEach: types.AnyFunction;
  getCurrentUser: types.AnyFunction;
  getUser: types.AnyFunction;
  getUsers: types.AnyFunction;
  initialize: types.AnyFunction;
}
export interface getChannelIdModuleInterface {
  getChannelId: types.AnyFunction;
  getCurrentlySelectedChannelId: types.AnyFunction;
  getLastChannelFollowingDestination: types.AnyFunction;
  getLastSelectedChannelId: types.AnyFunction;
  getLastSelectedChannels: types.AnyFunction;
  getMostRecentSelectedTextChannelId: types.AnyFunction;
  getVoiceChannelId: types.AnyFunction;
  initialize: types.AnyFunction;
}
export interface getGuildIdModuleInterface {
  getGuildId: types.AnyFunction;
  getLastSelectedGuildId: types.AnyFunction;
  getLastSelectedTimestamp: types.AnyFunction;
  getState: types.AnyFunction;
  getTabsV2SelectedGuildId: types.AnyFunction;
  initialize: types.AnyFunction;
}
export interface getCurrentSidebarChannelIdModuleInterface {
  getCurrentSidebarChannelId: types.AnyFunction;
  getCurrentSidebarMessageId: types.AnyFunction;
  getSection: types.AnyFunction;
  getSidebarState: types.AnyFunction;
  getState: types.AnyFunction;
  initialize: types.AnyFunction;
}
export interface getVoiceChannelIdModuleInterface {
  getAveragePing: types.AnyFunction;
  getChannelId: types.AnyFunction;
  getDuration: types.AnyFunction;
  getGuildId: types.AnyFunction;
  getHostname: types.AnyFunction;
  getLastPing: types.AnyFunction;
  getMediaSessionId: types.AnyFunction;
  getOutboundLossRate: types.AnyFunction;
  getPacketStats: types.AnyFunction;
  getPings: types.AnyFunction;
  getQuality: types.AnyFunction;
  getRTCConnection: types.AnyFunction;
  getRTCConnectionId: types.AnyFunction;
  getRemoteDisconnectVoiceChannelId: types.AnyFunction;
  getState: types.AnyFunction;
  getVoiceStateStats: types.AnyFunction;
  getWasEverMultiParticipant: types.AnyFunction;
  getWasEverRtcConnected: types.AnyFunction;
  initialize: types.AnyFunction;
  isConnected: types.AnyFunction;
  isDisconnected: types.AnyFunction;
}
export interface isMutedModuleInterface {
  flags: types.AnyFunction;
  getInitialOverlayState: types.AnyFunction;
  getMuteConfig: types.AnyFunction;
  getMutedThreads: types.AnyFunction;
  hasJoined: types.AnyFunction;
  isMuted: types.AnyFunction;
  joinTimestamp: types.AnyFunction;
}
export interface getStatusModuleInterface {
  findActivity: types.AnyFunction;
  getActivities: types.AnyFunction;
  getActivityMetadata: types.AnyFunction;
  getAllApplicationActivities: types.AnyFunction;
  getApplicationActivity: types.AnyFunction;
  getPrimaryActivity: types.AnyFunction;
  getState: types.AnyFunction;
  getStatus: types.AnyFunction;
  getUserIds: types.AnyFunction;
  initialize: types.AnyFunction;
  isMobileOnline: types.AnyFunction;
  setCurrentUserOnConnectionOpen: types.AnyFunction;
}
export interface userSettingsModuleInterface {
  allowAllMessages: types.AnyFunction;
  allowNoMessages: types.AnyFunction;
  getAllSettings: types.AnyFunction;
  getChannelFlags: types.AnyFunction;
  getChannelMessageNotifications: types.AnyFunction;
  getChannelMuteConfig: types.AnyFunction;
  getChannelOverrides: types.AnyFunction;
  getChannelUnreadSetting: types.AnyFunction;
  getGuildChannelFlags: types.AnyFunction;
  getGuildFavorites: types.AnyFunction;
  getGuildFlags: types.AnyFunction;
  getMessageNotifications: types.AnyFunction;
  getMuteConfig: types.AnyFunction;
  getMutedChannels: types.AnyFunction;
  getNewForumThreadsCreated: types.AnyFunction;
  getNotifyHighlights: types.AnyFunction;
  getOptedInChannels: types.AnyFunction;
  getOptedInChannelsWithPendingUpdates: types.AnyFunction;
  getPendingChannelUpdates: types.AnyFunction;
  getState: types.AnyFunction;
  initialize: types.AnyFunction;
  isCategoryMuted: types.AnyFunction;
  isChannelMuted: types.AnyFunction;
  isChannelOptedIn: types.AnyFunction;
  isChannelOrParentOptedIn: types.AnyFunction;
  isChannelRecordOrParentOptedIn: types.AnyFunction;
  isChannelRelevant: types.AnyFunction;
  isFavorite: types.AnyFunction;
  isGuildCollapsed: types.AnyFunction;
  isGuildOrCategoryOrChannelMuted: types.AnyFunction;
  isGuildUnreadSettingEnabled: types.AnyFunction;
  isMobilePushEnabled: types.AnyFunction;
  isMuteScheduledEventsEnabled: types.AnyFunction;
  isMuted: types.AnyFunction;
  isOptInEnabled: types.AnyFunction;
  isSuppressEveryoneEnabled: types.AnyFunction;
  isSuppressRolesEnabled: types.AnyFunction;
  resolvedMessageNotifications: types.AnyFunction;
}
export interface channelObject {
  application_id: undefined | string;
  defaultAutoArchiveDuration: undefined | string;
  defaultThreadRateLimitPerUser: undefined | string;
  flags_: number;
  guild_id: string;
  id: string;
  lastMessageId: string;
  lastPinTimestamp: string;
  memberListId: undefined | [];
  name: string;
  nsfw_: boolean;
  parent_id: string;
  permissionOverwrites_: object;
  position_: number;
  rateLimitPerUser_: number;
  topic_: string;
  type: number;
  version: string;
  accessPermissions: bigint;
  bitrate: number;
  flags: number;
  nsfw: boolean;
  permissionOverwrites: object;
  position: number;
  rateLimitPerUser: number;
  topic: string;
  userLimit: number;
}
export interface getInfoModuleInterface {
  commands: commandsInterface;
  events: eventsInterface;
  getCurrentUser: types.AnyFunction;
  getJoi: types.AnyFunction;
  onConnect: types.AnyFunction;
  onDisconnect: types.AnyFunction;
  sockets: object;
  subscriptions: [];
}
export interface guildInterface {
  afkChannelId: null | string;
  afkTimeout: number;
  applicationCommandCounts: object;
  application_id: null | string;
  banner: null | string;
  defaultMessageNotifications: number;
  description: null | string;
  discoverySplash: null | string;
  explicitContentFilter: number;
  features: object;
  homeHeader: null | string;
  hubType: null | string;
  icon: null | string;
  id: string;
  joinedAt: object;
  latestOnboardingQuestionId: null | string;
  maxMembers: number;
  maxStageVideoChannelUsers: number;
  maxVideoChannelUsers: number;
  mfaLevel: number;
  name: string;
  nsfwLevel: number;
  ownerId: string;
  preferredLocale: string;
  premiumProgressBarEnabled: boolean;
  premiumSubscriberCount: number;
  premiumTier: number;
  publicUpdatesChannelId: string;
  roles: object;
  rulesChannelId: string;
  safetyAlertsChannelId: null | string;
  splash: null | string;
  systemChannelFlags: number;
  systemChannelId: string;
  vanityURLCode: null | string;
  verificationLevel: number;
  acronym: string;
}
export interface messageInterface {
  channel: object;
  compact: boolean;
  flashKey: undefined;
  groupId: string;
  id: string;
  isHighlight: boolean;
  isLastItem: boolean;
  message: messageObj;
  renderContentOnly: boolean;
}

interface commandsInterface {
  ACCEPT_ACTIVITY_INVITE: object;
  ACTIVITY_INVITE_USER: object;
  AUTHENTICATE: object;
  AUTHORIZE: object;
  BILLING_POPUP_BRIDGE_CALLBACK: object;
  BRAINTREE_POPUP_BRIDGE_CALLBACK: object;
  BROWSER_HANDOFF: object;
  CAPTURE_LOG: object;
  CLOSE_ACTIVITY_JOIN_REQUEST: object;
  CONNECTIONS_CALLBACK: object;
  CONNECT_TO_LOBBY: object;
  CONNECT_TO_LOBBY_VOICE: object;
  CREATE_CHANNEL_INVITE: object;
  CREATE_LOBBY: object;
  DEEP_LINK: object;
  DELETE_LOBBY: object;
  DISCONNECT_FROM_LOBBY: object;
  DISCONNECT_FROM_LOBBY_VOICE: object;
  ENCOURAGE_HW_ACCELERATION: object;
  GET_APPLICATION_TICKET: object;
  GET_CHANNEL: object;
  GET_CHANNELS: object;
  GET_ENTITLEMENTS: object;
  GET_ENTITLEMENT_TICKET: object;
  GET_GUILD: object;
  GET_GUILDS: object;
  GET_IMAGE: object;
  GET_NETWORKING_CONFIG: object;
  GET_PLATFORM_BEHAVIORS: object;
  GET_RELATIONSHIPS: object;
  GET_SELECTED_VOICE_CHANNEL: object;
  GET_SKUS: object;
  GET_USER: object;
  GET_USER_ACHIEVEMENTS: object;
  GET_VOICE_SETTINGS: object;
  GIFT_CODE_BROWSER: object;
  GUILD_TEMPLATE_BROWSER: object;
  INVITE_BROWSER: object;
  NETWORKING_CREATE_TOKEN: object;
  NETWORKING_PEER_METRICS: object;
  NETWORKING_SYSTEM_METRICS: object;
  OPEN_EXTERNAL_LINK: object;
  OPEN_INVITE_DIALOG: object;
  OPEN_OVERLAY_ACTIVITY_INVITE: object;
  OPEN_OVERLAY_GUILD_INVITE: object;
  OPEN_OVERLAY_VOICE_SETTINGS: object;
  OVERLAY: object;
  REPLUGGED_INSTALL: object;
  SEARCH_LOBBIES: object;
  SELECT_TEXT_CHANNEL: object;
  SELECT_VOICE_CHANNEL: object;
  SEND_ACTIVITY_JOIN_INVITE: object;
  SEND_ANALYTICS_EVENT: object;
  SEND_TO_LOBBY: object;
  SET_ACTIVITY: object;
  SET_CERTIFIED_DEVICES: object;
  SET_CONFIG: object;
  SET_ORIENTATION_LOCK_STATE: object;
  SET_OVERLAY_LOCKED: object;
  SET_USER_ACHIEVEMENT: object;
  SET_USER_VOICE_SETTINGS: object;
  SET_USER_VOICE_SETTINGS_2: object;
  SET_VOICE_SETTINGS: object;
  SET_VOICE_SETTINGS_2: object;
  START_PREMIUM_PURCHASE: object;
  START_PURCHASE: object;
  SUBSCRIBE: object;
  UNSUBSCRIBE: object;
  UPDATE_LOBBY: object;
  UPDATE_LOBBY_MEMBER: object;
  USER_SETTINGS_GET_LOCALE: object;
  VALIDATE_APPLICATION: object;
}
interface eventsInterface {
  ACTIVITY_INVITE: object;
  ACTIVITY_JOIN: object;
  ACTIVITY_JOIN_REQUEST: object;
  ACTIVITY_PIP_MODE_UPDATE: object;
  ACTIVITY_SPECTATE: object;
  CHANNEL_CREATE: object;
  CURRENT_USER_UPDATE: object;
  ENTITLEMENT_CREATE: object;
  ENTITLEMENT_DELETE: object;
  GAME_JOIN: object;
  GAME_SPECTATE: object;
  GUILD_CREATE: object;
  GUILD_STATUS: object;
  LOBBY_DELETE: object;
  LOBBY_MEMBER_CONNECT: object;
  LOBBY_MEMBER_DISCONNECT: object;
  LOBBY_MEMBER_UPDATE: object;
  LOBBY_MESSAGE: object;
  LOBBY_UPDATE: object;
  MESSAGE_CREATE: object;
  MESSAGE_DELETE: object;
  MESSAGE_UPDATE: object;
  NOTIFICATION_CREATE: object;
  ORIENTATION_UPDATE: object;
  OVERLAY: object;
  OVERLAY_UPDATE: object;
  RELATIONSHIP_UPDATE: object;
  SPEAKING_START: object;
  SPEAKING_STOP: object;
  THERMAL_STATE_UPDATE: object;
  USER_ACHIEVEMENT_UPDATE: object;
  VOICE_CHANNEL_SELECT: object;
  VOICE_CONNECTION_STATUS: object;
  VOICE_SETTINGS_UPDATE: object;
  VOICE_SETTINGS_UPDATE_2: object;
  VOICE_STATE_CREATE: object;
  VOICE_STATE_DELETE: object;
  VOICE_STATE_UPDATE: object;
}
