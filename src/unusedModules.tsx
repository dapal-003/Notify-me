// const getVoiceChannelIdModule = (await webpack.waitForModule(
//   webpack.filters.byProps("getChannelId", "getAveragePing"),
// )) as unknown as getVoiceChannelIdModuleInterface;
// const isLurkingModule = await webpack.waitForModule(webpack.filters.byProps("isLurking"));
// const isMutedModule = (await webpack.waitForModule(
//   webpack.filters.byProps("isMuted", "hasJoined"),
// )) as unknown as isMutedModuleInterface;
// const getStatusModule = (await webpack.waitForModule(
//   webpack.filters.byProps("getStatus", "getActivities"),
// )) as unknown as getStatusModuleInterface;
// const userSettingsModule = (await webpack.waitForModule(
//   webpack.filters.byProps(
//     "allowAllMessages",
//     "isSuppressEveryoneEnabled",
//     "isSuppressRolesEnabled",
//   ),
// )) as unknown as userSettingsModuleInterface;

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
// A bunch of handy features, some already implemented
// export const getInfoModule = (await webpack.waitForModule(
//   webpack.filters.byProps("sockets", "events", "commands"),
// )) as unknown as getInfoModuleInterface;
