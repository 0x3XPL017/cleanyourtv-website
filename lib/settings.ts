// /addons Settings tab: the theme keys (the Keys table in themes/README.md) grouped by what they change,
// each with a plain-English title and the ask a coding agent gets. Written from the README's own text;
// a key missing here still shows, under "More", with its raw name.

export type SettingGroup = "look" | "dock" | "remote" | "clock" | "behaviour" | "more";

export const GROUPS: { id: SettingGroup; name: string; text: string }[] = [
  { id: "look", name: "Look", text: "Wallpaper, sky, glow, colours and motion" },
  { id: "dock", name: "Dock & apps", text: "The dock, the grid of tiles and the App library" },
  { id: "remote", name: "Remote & buttons", text: "The top bar's pills and what the remote's keys open" },
  { id: "clock", name: "Clock & info", text: "The greeting, dates and what shows under the clock" },
  { id: "behaviour", name: "Behaviour", text: "What Home does on its own" },
  { id: "more", name: "More", text: "Inputs and menus for particular TVs, and anything new" },
];

/** title: what it is or does, in plain words. ask: the imperative the copy line starts with. line: a short plain description, where the README's own first sentence runs long. */
export type Setting = { group: SettingGroup; title: string; ask: string; line?: string };

/** Keyed by a row's first key (`live_tv_package` for the live_tv_package, live_tv_action row). */
export const SETTINGS: Record<string, Setting> = {
  // Look
  background_color: { group: "look", title: "Background colour", ask: "Change the background colour" },
  sky_intensity: { group: "look", title: "Time-of-day sky", ask: "Turn on the time-of-day sky backdrop", line: "A dark gradient behind Home that follows the time of day." },
  wallpaper: { group: "look", title: "Theme wallpaper", ask: "Show the theme's wallpaper.jpg" },
  wallpaper_rotation_minutes: { group: "look", title: "Rotating wallpapers", ask: "Rotate the pictures in the theme's wallpapers folder", line: "A new picture from the theme's wallpapers folder at a set interval." },
  wallpaper_order: { group: "look", title: "Wallpaper order", ask: "Set the rotating wallpapers to shuffle or go in order" },
  wallpaper_dim: { group: "look", title: "Dim the wallpaper", ask: "Dim the wallpaper" },
  wallpaper_captions: { group: "look", title: "Wallpaper captions", ask: "Show the rotating wallpaper's name" },
  wallpaper_moods: { group: "look", title: "Wallpapers by time of day", ask: "Group the rotating wallpapers into morning, evening and night" },
  wallpaper_true_color: { group: "look", title: "Smoother wallpaper gradients", ask: "Decode wallpapers in 32-bit colour" },
  glow_style: { group: "look", title: "Glow style", ask: "Change the focus glow to the horizon style" },
  ambient_glow: { group: "look", title: "Turn off the dock glow", ask: "Turn off the coloured glow behind the dock" },
  app_glow: { group: "look", title: "Glow in each app's colour", ask: "Make the focus highlight glow in each app's colour" },
  cinematic_home: { group: "look", title: "Cinematic top shelf", ask: "Turn on the cinematic top shelf", line: "The focused app's artwork fills the top of the screen, in its colour." },
  cinematic_dots: { group: "look", title: "Hide the shelf's dots", ask: "Hide the dock position dots on the cinematic shelf" },
  cinematic_white_focus: { group: "look", title: "White focus on the shelf", ask: "Keep the focus highlight white on the cinematic dock" },
  cinematic_scrim: { group: "look", title: "Shelf shade strength", ask: "Lower the dark scrim behind the cinematic shelf's name" },
  cinematic_art: { group: "look", title: "Shelf artwork strength", ask: "Change how strongly the cinematic shelf shows the app's artwork" },
  fade_rows: { group: "look", title: "Fade rows under the clock", ask: "Fade the rows out as they scroll up under the clock" },
  animations: { group: "look", title: "Turn off animations", ask: "Turn off the focus, glass, title and tile entrance animations" },
  advanced_effects: { group: "look", title: "Advanced effects", ask: "Turn on the advanced effects: lifted tile, icon zoom and app opening" },
  reduced_motion: { group: "look", title: "Calmer motion", ask: "Turn on reduced motion" },
  focus_overshoot: { group: "look", title: "No swing on focus", ask: "Turn off the focus overshoot so the highlight glides straight there" },
  festival: { group: "look", title: "Festive skin", ask: "Turn on a festive skin", line: "A diya for Wi-Fi, a bell for Inputs, a marigold for Settings and a petal shower." },
  festival_until: { group: "look", title: "Festive skin end date", ask: "Set the last day the festive skin shows" },
  accent_color: { group: "look", title: "Festive glow colour", ask: "Change the festive skin's glow colour" },

  // Dock & apps
  dock_apps: { group: "dock", title: "Dock apps", ask: "Choose which apps sit in the dock, in order" },
  fill_dock: { group: "dock", title: "Leave free dock slots empty", ask: "Stop filling free dock slots with grid apps" },
  hidden_apps: { group: "dock", title: "Hide apps", ask: "Hide some apps from Home" },
  columns: { group: "dock", title: "Tiles per row", ask: "Change the number of tiles per row", line: "How many tiles sit in each row, from 1 to 8." },
  rows_below_dock: { group: "dock", title: "Rows under the dock", ask: "Change how many grid rows show under the dock" },
  dock_title: { group: "dock", title: "App name above the dock", ask: "Show or hide the large app name above the dock" },
  dock_row: { group: "dock", title: "Dock as its own row", ask: "Make the dock apps the first tiles of one plain grid" },
  dock_opacity: { group: "dock", title: "See-through dock", ask: "Make the dock band see-through" },
  dock_glass: { group: "dock", title: "Frosted glass dock", ask: "Turn on the frosted glass dock", line: "The dock band as light frosted glass, like the top bar's pills." },
  dock_even_padding: { group: "dock", title: "Even dock padding", ask: "Turn on even padding around the dock band" },
  always_show_names: { group: "dock", title: "Names under every tile", ask: "Show names under every tile" },
  app_labels: { group: "dock", title: "Rename a tile", ask: "Rename an app's tile" },
  app_banners: { group: "dock", title: "Built-in tile artwork", ask: "Give a tile one of the launcher's bundled banners" },
  launch_actions: { group: "dock", title: "Open a screen inside an app", ask: "Make a tile open a particular screen of its app" },
  app_library: { group: "dock", title: "App library", ask: "Turn on the App library", line: "A pill after the last row with every installed app: add one to Home or take it off." },
  app_library_selection: { group: "dock", title: "Checkmarks in the App library", ask: "Turn on checkmark selection in the App library" },
  library_apps: { group: "dock", title: "Apps already added", ask: "Pre-add some apps to Home through the App library" },
  library_button: { group: "dock", title: "App library button", ask: "Add the App library button to the top bar" },
  tile_menu: { group: "dock", title: "Tile menu", ask: "Turn on the tile menu: Move, Remove from Home and App info" },
  module_cards: { group: "dock", title: "Module cards", ask: "Turn off module cards" },
  show_home_settings_shortcut: { group: "dock", title: "Default-home tile", ask: "Keep the Default-home tile visible" },

  // Remote & buttons
  show_inputs_pill: { group: "remote", title: "Hide the Inputs pill", ask: "Hide the Inputs pill", line: "Takes the Inputs pill off the top bar. The remote's Input button still works." },
  show_network_pill: { group: "remote", title: "Hide the Wi-Fi pill", ask: "Hide the Wi-Fi pill" },
  icon_only_buttons: { group: "remote", title: "Round icon buttons", ask: "Make Wi-Fi and Settings round icon buttons" },
  icon_only_inputs: { group: "remote", title: "Round Inputs button", ask: "Make the Inputs pill a round icon button" },
  top_menu: { group: "remote", title: "One gear menu", ask: "Fold Inputs, Wi-Fi and Settings into one gear menu" },
  launcher_settings_button: { group: "remote", title: "Settings opens Launcher settings", ask: "Make the Settings button open Launcher settings" },
  reorder_button: { group: "remote", title: "Reorder button", ask: "Add a reorder button to the top bar" },
  wifi_status_color: { group: "remote", title: "Green Wi-Fi when online", ask: "Make the Wi-Fi icon green while the TV is online" },
  wifi_label_width: { group: "remote", title: "Network name on the round Wi-Fi", ask: "Keep the network name on the round Wi-Fi button" },
  vpn_app: { group: "remote", title: "VPN app and badge", ask: "Set my VPN app for the network pill" },
  settings_key_keycodes: { group: "remote", title: "Remote button for Settings", ask: "Make a remote button open Settings" },
  settings_key_panel: { group: "remote", title: "Quick settings panel", ask: "Make my remote's Settings button open the quick settings panel", line: "The remote's Settings button opens a small quick settings panel." },
  input_key_keycodes: { group: "remote", title: "More Input buttons", ask: "Make another remote button open the input switcher" },
  app_keys: { group: "remote", title: "Remote buttons that open apps", ask: "Make remote buttons open apps" },
  handle_view_inputs: { group: "remote", title: "Input button opens the Inputs menu", ask: "Answer the remote's Input button with the Inputs menu" },
  key_filter: { group: "remote", title: "Stop key filtering", ask: "Turn off key filtering in the remote's key helpers" },
  restore_key_services: { group: "remote", title: "Bring back the key helpers", ask: "Restore the remote's key helpers after a force stop" },

  // Clock & info
  home_idle_clock_minutes: { group: "clock", title: "Clock screensaver", ask: "Turn on the clock screensaver", line: "A drifting clock and date once Home sits untouched for a while." },
  show_stats: { group: "clock", title: "CPU, memory and storage", ask: "Show CPU, free memory and free storage under the clock" },
  shamsi_date: { group: "clock", title: "Solar Hijri date", ask: "Show the Solar Hijri date" },
  greeting_name: { group: "clock", title: "Your name in the greeting", ask: "Add my name to the greeting" },
  greeting: { group: "clock", title: "Festive greeting", ask: "Change the greeting the festive skin shows" },
  race_calendar: { group: "clock", title: "F1 race weekends", ask: "Turn on the F1 race-weekend panel" },

  // Behaviour
  boot_to_live_tv: { group: "behaviour", title: "Start on Live TV", ask: "Open Live TV when the TV starts" },
  live_tv_package: { group: "behaviour", title: "Live TV app", ask: "Set the Live TV app" },
  stock_home_redirect: { group: "behaviour", title: "Send the stock home back", ask: "Send the stock launcher's home screen straight back to CleanYourTV" },

  // More: for particular TVs
  live_tv_input_id: { group: "more", title: "Live TV tuner", ask: "Set the tuner for the Inputs menu's Live TV row" },
  source_panel_service: { group: "more", title: "TV's own source panel", ask: "Use my TV's own source panel for Inputs" },
  source_panel_extra: { group: "more", title: "Source panel extra", ask: "Set the extra sent with my TV's source panel" },
  coocaa_sources: { group: "more", title: "Coocaa OS sources", ask: "List the Coocaa OS sources in the Inputs menu" },
  input_action: { group: "more", title: "HDMI input action", ask: "Set the action my TV's HDMI inputs open with" },
  input_uri_scheme: { group: "more", title: "HDMI input scheme", ask: "Set the URI scheme my TV's HDMI inputs open with" },
  input_sources: { group: "more", title: "Vendor input numbers", ask: "Map my TV's vendor source numbers for the Inputs menu" },
  settings_fallback_components: { group: "more", title: "Vendor settings screens", ask: "Add my TV's own settings screen as a fallback" },
};

/** Shown first, with a screenshot when docs/switches.md has one. */
export const FEATURED = [
  "dock_glass", "sky_intensity", "columns", "wallpaper_rotation_minutes", "home_idle_clock_minutes",
  "cinematic_home", "show_inputs_pill", "settings_key_panel", "festival",
];

const humanize = (key: string) => key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

/** A row's setting; a key this table doesn't know yet lands in "More" under its raw name. */
export function settingOf(keys: string[]): Setting {
  return SETTINGS[keys[0]] || { group: "more", title: humanize(keys[0]), ask: `Set ${keys.join(" and ")}` };
}
