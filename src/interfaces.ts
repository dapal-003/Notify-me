export interface messageObj {
  attachments: Array<attachment>;
  author: author;
  channel_id: string;
  components: any[];
  content: string;
  edited_timestamp: string;
  embeds: any[];
  flags: number;
  guild_id: string;
  id: string;
  member: member;
  mention_everyone: boolean;
  mention_roles: any[];
  mentions: Array<author>;
  nonce: string;
  pinned: boolean;
  referenced_message: messageObj;
  timestamp: string;
  tts: boolean;
  type: number;
}

export interface author {
  avatar: string;
  avatarDecoration: any;
  discriminator: string;
  display_name: any;
  id: string;
  publicFlags: number;
  username: string;
}

export interface member {
  avatar: string;
  communication_disabled_until: any;
  deaf: boolean;
  flags: number;
  joined_at: string;
  mute: boolean;
  nick: string;
  pending: boolean;
  premium_since: string;
  roles: Array<string>;
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

  supressGuilds?: string;
  supressChannels?: string;
  supressUsers?: string;
  supressKeywords?: string;

  statusOverride?: boolean; //true

  method?: boolean; //'word',
  caseSensitive?: boolean; //false

  mentionEveryone?: boolean; //true
  mentionRoles?: boolean; // true

  highlightKeywords?: boolean; // true
  lurkedGuilds?: boolean; //false
  managedChannels?: boolean; //false
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
  avatarDecoration: any;
  bot: boolean;
  desktop: boolean;
  discriminator: string;
  email: string;
  flags: number;
  guildMemberAvatars: any;
  hasAnyStaffLevel: any;
  hasBouncedEmail: boolean;
  hasFlag: any;
  id: string;
  isStaff: any;
  isStaffPersonal: any;
  mfaEnabled: boolean;
  mobile: boolean;
  nsfwAllowed: any;
  personalConnectionId: any;
  phone: any;
  premiumType: any;
  premiumUsageFlags: number;
  publicFlags: number;
  purchasedFlags: number;
  system: boolean;
  username: string;
  verified: boolean;
  createdAt: any;
  tag: string;
}

export interface channelInterface {
  application_id: any;
  defaultAutoArchiveDuration: any;
  defaultThreadRateLimitPerUser: any;
  flags_: number;
  guild_id: string;
  id: string;
  lastMessageId: string;
  lastPinTimestamp: string;
  memberListId: any;
  name: string;
  nsfw_: boolean;
  parent_id: string;
  permissionOverwrites_: any;
  position_: number;
  rateLimitPerUser_: number;
  topic_: string;
  type: number;
  version: any;
  accessPermissions: any;
  bitrate: number;
  flags: number;
  nsfw: boolean;
  permissionOverwrites: any;
  position: number;
  rateLimitPerUser: number;
  topic: string;
  userLimit: number;
}
