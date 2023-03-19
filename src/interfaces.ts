/* eslint-disable @typescript-eslint/naming-convention */
import { types } from "replugged";
export interface messageObj {
  attachments: attachment[];
  author: author;
  channel_id: string;
  components: object[];
  content: string;
  edited_timestamp: null | string;
  embeds: object[];
  flags: number;
  guild_id?: string;
  id: string;
  member: member;
  mention_everyone: boolean;
  mention_roles: object[];
  mentions: author[];
  nonce: string;
  pinned: boolean;
  referenced_message: referenceMessage;
  message_reference: messageReference;
  timestamp: string;
  tts: boolean;
  type: number;
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
}
export interface messageCreate {
  channelId: string;
  guildId: string;
  isPushNotification: boolean;
  message: messageObj;
  optimistic: boolean;
  type: string;
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
