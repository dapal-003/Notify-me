import type React from "react";
import { components, util } from "replugged";
import { cfg } from "./index";
const { FormItem, TextInput, Category, SwitchItem } = components;

export default (): React.ReactElement => {
  const notifyGuilds = util.useSetting(cfg, "notifyGuilds");
  const notifyChannels = util.useSetting(cfg, "notifyChannels");
  const notifyUsers = util.useSetting(cfg, "notifyUsers");
  const notifyKeyword = util.useSetting(cfg, "notifyKeywords");

  const suppressGuilds = util.useSetting(cfg, "suppressGuilds");
  const suppressChannels = util.useSetting(cfg, "suppressChannels");
  const suppressUsers = util.useSetting(cfg, "suppressUsers");
  const suppressKeyword = util.useSetting(cfg, "suppressKeywords");

  const method = util.useSetting(cfg, "method", true);
  const caseSensitive = util.useSetting(cfg, "caseSensitive", false);
  const highlightKeywords = util.useSetting(cfg, "highlightKeywords", true);
  const simpleNotation = util.useSetting(cfg, "simpleNotation", true);

  const mentionEveryone = util.useSetting(cfg, "mentionEveryone", true);
  const mentionRoles = util.useSetting(cfg, "mentionRoles", true);
  const statusOverride = util.useSetting(cfg, "statusOverride", true);
  const lurkedGuilds = util.useSetting(cfg, "lurkedGuilds", false);
  const managedChannels = util.useSetting(cfg, "managedChannels", false);

  return (
    <>
      <Category title="Notify" note="Notify me of these items.">
        <FormItem title="Notify guilds">
          <TextInput {...notifyGuilds} />
        </FormItem>
        <br />
        <FormItem title="Notify Channels">
          <TextInput {...notifyChannels} />
        </FormItem>
        <br />
        <FormItem title="Notify Users">
          <TextInput {...notifyUsers} />
        </FormItem>
        <br />
        <FormItem title="Notify Keywords">
          <TextInput {...notifyKeyword} />
        </FormItem>
        <br />
      </Category>
      <Category title="Suppress" note="Suppress me of these items:">
        <FormItem title="Suppress guilds">
          <TextInput {...suppressGuilds} />
        </FormItem>
        <br />
        <FormItem title="Suppress Channels">
          <TextInput {...suppressChannels} />
        </FormItem>
        <br />
        <FormItem title="Suppress Users">
          <TextInput {...suppressUsers} />
        </FormItem>
        <br />
        <FormItem title="Suppress Keywords">
          <TextInput {...suppressKeyword} />
        </FormItem>
        <br />
      </Category>
      <Category title="Settings" note="Additional settings on how the plugin works">
        <SwitchItem {...simpleNotation} note="When disabled you must use JSON notation">
          Use a comma to separate the items you want to notify or suppress instead of JSON notation
        </SwitchItem>
        <SwitchItem
          {...method}
          note="If any part of the word is in a message - for example `kat` would trigger if someone said
          `kitkat`.">
          Use substring matches.
        </SwitchItem>
        <SwitchItem
          {...caseSensitive}
          note="Makes the keyword `kat` match only `kat` and not `KAT`">
          Make keywords case sensitive.
        </SwitchItem>
        <SwitchItem
          {...highlightKeywords}
          note="Disabling this will make this addon appear more stealthy as there won't be highlights for notifications that don't normally exist.">
          Highlight messages with keywords
        </SwitchItem>
      </Category>
      <Category
        title="Unused settings"
        note="These settings are implemented but currently have no use">
        <SwitchItem {...mentionEveryone} note="mentionEveryone">
          mentionEveryone
        </SwitchItem>
        <SwitchItem {...mentionRoles} note="mentionRoles">
          mentionRoles
        </SwitchItem>
        <SwitchItem {...lurkedGuilds} note="lurkedGuilds">
          lurkedGuilds
        </SwitchItem>
        <SwitchItem {...managedChannels} note="managedChannels">
          managedChannels
        </SwitchItem>
        <SwitchItem {...statusOverride} note="Notify me even if I am in DND">
          Status override
        </SwitchItem>
      </Category>
    </>
  );
};
