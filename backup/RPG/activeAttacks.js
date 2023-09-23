const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("active-attacks")
    .setDescription("Maneuvers")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("basic")
        .setDescription("List of basic attacks")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Input a query")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("melee")
        .setDescription("List of all-out attack melee")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Input a query")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ranged")
        .setDescription("List melee all-out attack ranged")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Input a query")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("extras")
        .setDescription("List of special maneuvers")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Input a query")
            .setRequired(true)
            .setAutocomplete(true)
        )
    ),
  async autocomplete(interaction, client) {
    const value = interaction.options.getFocused().toLowerCase();
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "extras") {
      choices = [
        "Deceptive Attack",
        "Pop-up Attack",
        "Rapid Strike",
        "Riposte",
        "Stop hit",
        "Spraying Fire",
        "Telegraphic Attack",
        "Tip Slash",
      ];
    }
    if (subcommand === "basic") {
      choices = [
        "Aim",
        "Attack",
        "Change Posture",
        "Concentrate",
        "Committed Attack",
        "Defensive Attack",
        "Do Nothing",
        "Evaluate",
        "Feint",
        "Move and Attack",
        "Move",
        "Ready",
        "Wait",
      ];
    }

    if (subcommand === "melee") {
      choices = ["Determined", "Double", "Feint", "Long", "Strong"];
    }
    if (subcommand === "ranged") {
      choices = ["Determined", "Suppression Fire"];
    }

    const filtered = choices
      .filter((choice) => choice.toLowerCase().includes(value))
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    let choices;
    const act = "Active Defenses";
    const mvt = "Movement";
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "basic") {
      const query = interaction.options.getString("query");

      if (query === "Aim") {
        desc =
          "Aim a ranged weapon to get its Acc bonus (+1 for bracing, +1 for 2 turns, +2 for 3+ turns, the combined bonus from all targeting systems cannot exceed the weapon’s base Accuracy) | You get no step if your two-handed weapon is braced.";
        ac = "Any";
        mv = "Step | None";
      }
      if (query === "Attack") {
        desc =
          "Attack unarmed or with a ready weapon, you make take a step before or after you attack.";
        ac = "Any";
        mv = "Step";
      }
      if (query === "Change Posture") {
        desc =
          "Standing, sitting, kneeling, crawling, prone, lying face up (see B364/MA98). Prone to standing takes two turns (Exception Acrobatic Stand).";
        ac = "Any";
        mv = "None";
      }
      if (query === "Concentrate") {
        desc =
          "Focus on mental task. All-Out Concentrate (DF14:34) gives +1 to roll but loose active defenses. Must make Will-2 if injured or distracted.";
        ac =
          "Any.Taking an active defense or being knocked down, injured, distracted etc. requires a Will-3 roll to maintain.";
        mv = "Step";
      }
      if (query === "Defensive Attack") {
        desc =
          "Balanced weapon: +1 Parry/Block, Unbalanced weapon: +1 Parry/Block with different weapon or Parry with the same weapon, Kick: +2 to avoid Leg Grapple and DX rolls to avoid falling. -2 to damage (or -1 per die if worse), foe gets +1 to defend against a grab or grapple.";
        ac = "Any";
        mv = "Step. Before or after attack.";
      }
      if (query === "Evaluate") {
        desc =
          "Study a foe prior to a melee attack (+1 per turn to subsequent attacks or feints, max. +3); may also use the Evaluate Bonus to cancel out penalties from Deceptive Attacks or feints.";
        ac = "Any";
        mv = "Step";
      }
      if (query === "Move and Attack") {
        desc =
          "ove and attack at a penalty (Ranged: -2 or weapon’s bulk; non-slam Melee: -4, max. skill 9). For thrusting attacks, may use slam damage (HP x velocity/100). Not compatible with Flurry of Blows, Mighty Blow, Giant Step, Combos, Rapid Strike or Deceptive Attack (except slams or cinematic techniques wich require final effective skill of at least 10.).";
        ac = "Any";
        mv = "Full Move (-2 to avoid falling)";
      }
      if (query === "Move") {
        desc =
          "Do nothing but move (See Sprinting B354 and Acrobatic Movement MA105+).";
        ac = "Any";
        mv = "Full Move";
      }
      if (query === "Ready") {
        desc =
          "Ready or reload a weapon, adjust reach (B269), change grip, change hands (MA102).";
        ac = "Any";
        mv = "Full Move";
      }
      if (query === "Move") {
        desc =
          "Hold your action, then take an Attack, All-Out Attack, Committed Attack, Defensive Attack, Feint, Ready or Stop Hit. Specify exactly what your action will be and what will trigger it. You may also perform a Step and Wait, loosing your Step in the proceeding Maneuver.";
        ac = "Any";
        mv = "Varies";
      }
      if (query === "Committed Attack") {
        desc = `
        
        **Determined**: +2 to hit, pr tale two steps at -2 to hit for a total modifier of 0, may move before and after an attack.\n 
        **Strong**: +1 to amage (or +1 per two damage dice). ST-based attacks only, may take 2 steps at -2 to skill, may move before or after an attack.
        
        `;
        ac = "Any";
        mv = "Varies";
      }
      if (query === "Feint") {
        desc = `
        
        Melee (May use the highest melee weapon or unarmed combat skill to resist a feint; for optional ranged feints, see MA121).\n
        **Beat**: Contest of ST-based combat skill vs foe’s ST- or DX-based skill (MA100).\n
        **Defensive Feint**: Apply the penalty from a successful Beat, Feint or Ruse to foe’s attacks roll instead of defense.\n
        **Feint**: Contest of combat skill (melee or ranged) vs. combat skill, cloak/shield or DX.\n
        **Ruse**:Contest of IQ-based combat skill vs. foe’s Per-based skill, DX-based skill or Tactics (MA101).
        
        `;
        ac = "Any";
        mv = "Step";
      }

      const embed = new EmbedBuilder();

      embed
        .setColor(0x5506ce)
        .setTitle(query)
        .setDescription(desc)
        .addFields(
          { name: act, value: ac, inline: true },
          { name: mvt, value: mv, inline: true }
        );

      await interaction.reply({ embeds: [embed] });
    }
    if (subcommand === "melee") {
      const query = interaction.options.getString("query");

      if (query === "Determined") {
        desc = "+4 to hit";
        ac = "none";
        mv = "1/2 Forward";
      }
      if (query === "Double") {
        desc =
          "2 attacks on same foe with ready weapon (-4 to off-hand without Ambidexterity";
        ac = "none";
        mv = "1/2 Forward";
      }
      if (query === "Feint") {
        desc = "Make one feint and one attack on the same foe";
        ac = "none";
        mv = "1/2 Forward";
      }
      if (query === "Long") {
        desc =
          "Increase reach by 1 yard (Swing attacks at -2 dmg or -1 per die), may end in crouch (MA87)";
        ac = "none";
        mv = "1/2 Forward";
      }
      if (query === "Strong") {
        desc = "+2 to damage (or +1 per damage die)";
        ac = "none";
        mv = "1/2 Forward";
      }

      const embed = new EmbedBuilder();

      embed
        .setColor(0x5506ce)
        .setTitle(query)
        .setDescription(desc)
        .addFields(
          { name: act, value: ac, inline: true },
          { name: mvt, value: mv, inline: true }
        );

      await interaction.reply({ embeds: [embed] });
    }

    if (subcommand === "ranged") {
      const query = interaction.options.getString("query");
      if (query === "Determined") {
        desc = "+1 to hit";
        ac = "none";
        mv = "1/2 Forward";
      }
      if (query === "Suppression Fire") {
        desc =
          "RoF 5+ targets 2 yard zone - RoF 10+ suppress multiple, adjacent 2 yard zones with 5+ Shots/zone";
        ac = "none";
        mv = "1/2 Forward";
      }
      const embed = new EmbedBuilder();

      embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
      await interaction.reply({ embeds: [embed] });
    }
    if (subcommand === "extras") {
      const query = interaction.options.getString("query");
      if (query === "Deceptive Attack") {
        desc =
          "Target suffers a -1 to active defense for every -2 taken to melee skill (min. skill of 10), or -1 to Dodge for every -2 taken to ranged skill (min. skill of 10).";
      }
      if (query === "Pop-up Attack") {
        desc =
          "Ranged attacks only, attacker suffers -2 to hit, no aim possible, may step. Not possible with bow or sling.";
      }
      if (query === "Rapid Strike") {
        desc =
          "Make two attacks, both at -6, to replace one normal attack. Can target seperate foes. Ranged Rapid Strikes if RoF 2+. Half penalty for Weaponmaster or Gunslinger.";
      }
      if (query === "Riposte") {
        desc =
          "Take a penalty to your Parry (mininum of 8) not including modifiers. If Parry succeds and you attack using the parrying weapon next turn, apply the same penalty to your foes Parry (hand or weapon), Block (shield) or Dodge (non-hand unarmed strike) or half that penalty to all other defenses.";
      }
      if (query === "Stop hit") {
        desc =
          "Take a Wait Maneuver and declare that you intend to attack. Both roll to hit. Both fail, nothing happens. If one hits, the other defends at -1 or -3 if Parry with same weapon. If both hit, larger margin of success defends normally, other at penalty above. If tied, both have above penalty. Possible with Unbalaced/Unready Weapon.";
      }
      if (query === "Spraying Fire") {
        desc =
          "RoF 5+ weapon may attack multiple targets, must be within 30° angle, engaged in succession, +1 Rcl 2nd target +2 Rcl 3rd target and so on. RoF -16 looses 1 shot/yard, RoF 16+ looses 2 shot/yard. Attack roll for each target with effective RoF.";
      }
      if (query === "Telegraphic Attack") {
        desc =
          "+4 to hit, +2 to defend against. Not compatible with Deceptive Attack, Evaluate, Riposte or Feint. Does not affect critical chance.";
      }
      if (query === "Tip Slash") {
        desc =
          "Swing a thrusting, impaling weapon to do cutting damage equal to the weapons impaling damage -2";
      }
      const embed = new EmbedBuilder();

      embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
      await interaction.reply({ embeds: [embed] });
    }
  },
};
