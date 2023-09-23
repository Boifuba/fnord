const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hit-locations")
    .setDescription("Maneuvers")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Input a query")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction, client) {
    const value = interaction.options.getFocused().toLowerCase();

    choices = [
      "Skull",
      "Face",
      "Right Leg",
      "Right Arm",
      "Torso",
      "Abdomen",
      "Left Arm",
      "Left Leg",
      "Hand",
      "Foot",
      "Neck",
      "Vitals",
      "Eyes",
      "Ears",
      "Nose",
      "Jaw",
      "Spine",
      "Limb Vascular",
      "Neck Vascular",
      "Arm/Leg Joint",
      "Hand/Foot Joint",
      "Groin",
      "Pelvis",
      "Digestive Tract",
      "Heart",
    ];

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

    const query = interaction.options.getString("query");

    if (query === "Skull") {
      desc = `
        Attack that misses by 1 hits the torso instead. Only imp, pi, and tbb attacks can target the eye and only from the front or sides. Injury over HP/10 blinds the eye. Otherwise, treat as skull, but without the extra DR!The skull gets an extra DR 2. Wounding modifier is x4. Knockdown rolls are at -10. Critical hits use the Critical Head Blow Table (B556). Exception: These special effects do not apply to tox damage.
        `;
      a = "3-4";
      b = "-7(f)/-5(b)";
    }

    if (query === "Face") {
      desc = `
        Attack that misses by 1 hits the torso instead. Only imp, pi, and tbb attacks can target the eye and only from the front or sides. Injury over HP/10 blinds the eye. Otherwise, treat as skull, but without the extra DR! Jaw, cheeks, nose, ears, etc. If the target has an open-faced helmet, ignore its DR. Knock- down rolls are at -5. Critical hits use the Critical Head Blow Table (B556). Cor damage gets a x1.5 wounding modifier, and if it inflicts a major wound, it also blinds one eye (both eyes on damage over full HP). Random attacks from behind hit the skull instead. On front hit, roll 1d. 1 means skull hit if attack is imp, pi, tbb. Otherwise it's a nose hit.
        `;
      a = "5";
      b = "-5(f)/-7(b)";
    }

    if (query === "Right Leg") {
      desc =
        "Limb. Reduce the wounding multiplier of large pi, huge pi and imp damage to x1. Any major wound (loss of over 1/2 HP from one blow) cripples the limb. Damage beyond that threshold is lost. Roll 1d, on a 1 cut, imp, pi, tbb hit vein/artery. *cr* hits a joint.";
      a = "6-7";
      b = "-2";
    }

    if (query === "Right Arm") {
      desc = `Reduce the wounding multiplier of large pi, huge pi and imp damage to x1. Any major wound (loss of over 1/2 HP from one blow) cripples the limb. Damage beyond that threshold is lost. Roll 1d, on a 1 cut, imp, pi, tbb hit vein/artery. *cr* hits a joint. If holding a shield, double the penalty to hit: -4 for shield arm, -8 for shield hand.`;
      a = "8";
      b = "-2";
    }

    if (query === "Torso") {
      desc = `Roll 1d if *cr*, *imp*, *pi* or *tbb*. On 1, hit to the vitals, *cut* from behind hits the spine.`;
      a = "9-10";
      b = "0";
    }

    if (query === "Abdomen") {
      desc = "[20] Roll 1d, 1 is Vitals ";
      a = "11";
      b = "-1";
    }

    if (query === "Left Arm") {
      desc = `Reduce the wounding multiplier of large *pi*, *huge pi* and *im*p damage to x1. Any major wound (loss of over 1/2 HP from one blow) cripples the limb. Damage beyond that threshold is lost. Roll 1d, on a 1 cut, imp, pi, tbb hit vein/artery. *cr* hits a joint.
        If holding a shield, double the penalty to hit: -4 for shield arm, -8 for shield hand.`;
      a = "12";
      b = "-2";
    }

    if (query === "Left Leg") {
      desc = `Reduce the wounding multiplier of *large pi*, *huge pi* and *imp* damage to x1. Any major wound `;
      a = "13-14";
      b = "-2";
    }

    if (query === "Hand") {
      desc = `If holding a shield, double the penalty to hit: -4 for shield arm, -8 for shield hand.
         Extremity. Treat as a limb, except that damage over 1/3 HP in one blow inflicts a crippling major wound. Excess damage is still lost. Roll 1d, on a 1 with cr, cut, pi, tbb hits a joint
        If rolling randomly, roll 1d: 1-3 is right, 4-6 is left.
        `;
      a = "15";
      b = "-4";
    }

    if (query === "Foot") {
      desc = `Extremity. Treat as a limb, except that damage over 1/3 HP in one blow inflicts a crippling major wound. Excess damage is still lost. Roll 1d, on a 1 with cr, cut, pi, tbb hits a joint.`;
      a = "16";
      b = "-4";
    }

    if (query === "Neck") {
      desc = `Attack that misses by 1 hits the torso instead.
         Neck and throat. Increase the wounding multiplier of cr and cor attacks to x1.5, and that of cutting damage to x2. At the GM's option, anyone
killed by a cutting blow to the neck is decapitated! Roll 1d, on a 1 with cut, imp, pi, tbb hits vein/artery 
        `;
      a = "17-18";
      b = "-5";
    }

    if (query === "Vitals") {
      desc = `Attack that misses by 1 hits the torso instead.
         Heart, lungs, kidneys, etc. Increase wound- ing modifier for imp or pi attack to x3. Increase wounding modifier for tbb attack to ×2. cr is only x1, if caused shock roll vs. knockdown, -5 if major wound, other attacks cannot target the vitals.`;
      a = "-";
      b = "-3";
    }

    if (query === "Eyes") {
      desc = `
        
 Attack that misses by 1 hits the torso instead. 
 Only imp, pi, and tbb attacks can target the eye and only from the front or sides. Injury over HP/10 blinds the eye. Otherwise, treat as skull, but without the extra DR!`;
      a = "-";
      b = "-9";
    }

    if (query === "Ears") {
      desc = ` Attack that misses by 1 hits the torso instead. 
         Ear, if cutting max Dmg = HP/4, double HP/4 removes ear which gives -1 Appearance 

        `;
      a = "-";
      b = "-7";
    }

    if (query === "Nose") {
      desc = `
         Attack that misses by 1 hits the torso instead. 
         Nose, only targetable from the front, treat like facehit, HP/4 breaks nose gives major wound and no Sense of Smell/Taste until healed. Cut lops off nose if HP/4×2 (major wound) but knockdown not at -5 for face. Cutting off nose = Appearance -2

        `;

      a = "-";
      b = "-7";
    }

    if (query === "Jaw") {
      desc = `
         Attack that misses by 1 hits the torso instead. 
         Jaw, if crushing extra -1 to knockdown 

        `;
      a = "-";
      b = "-6";
    }

    if (query === "Spine") {
      desc = ` Attack that misses by 1 hits the torso instead. Spine, only targetable from behind with cr, cut, imp, pi, tbb. DR3, if shock-penatly roll against knockdown, crippled if dmg = HP which causes automatic knockdown and stunning`;
      a = "-";
      b = "-8";
    }

    if (query === "Limb Vascular") {
      desc = ` Veins and Arteries, only targetable by cut, imp, pi, tbb. Increases wounding modifier plus 0.5, no crippling and no dmg limit, an attack that miss- es by 1 hits the neck, arm or leg, as appropriate. `;
      a = "-";
      b = "-5";
    }

    if (query === "Neck Vascular") {
      desc = `Veins and Arteries, only targetable by cut, imp, pi, tbb. Increases wounding modifier plus 0.5, no crippling and no dmg limit, an attack that miss- es by 1 hits the neck, arm or leg, as appropriate. `;
      a = "-";
      b = "-8";
    }

    if (query === "Arm/Leg Joint") {
      desc = `Joints, limb crippeld at HP/3, extremity at HP4, HT roll to recover from crippling -2, miss by 1 hits the limb or extremity not the joint `;
      a = "-";
      b = "-5";
    }

    if (query === "Hand/Foot Joint") {
      desc = ` Joints, limb crippeld at HP/3, extremity at HP4, HT roll to recover from crippling -2, miss by 1 hits the limb or extremity not the joint `;
      a = "-";
      b = "-7";
    }

    if (query === "Groin") {
      desc = ` Attack that misses by 1 hits the torso instead.
        Human males/males of similar species suf- fer double shock from cr damage, and get -5 to knockdown rolls. Otherwise, treat as a torso hit. `;
      a = "-";
      b = "-3";
    }

    if (query === "Pelvis") {
      desc = `Roll 1d if cr, imp, pi or tbb. On 1, hit to the vitals [11], cut from behind hits the spine  if major wound you fall down. Until healed you're Lame(Missing Leg). Can't stand, fight sitting or lying. Armor for torso and groin or specific protects normal.`;
      a = "-";
      b = "-3";
    }

    if (query === "Digestive Tract") {
      desc = `If major wound HT-3 or get a special infection (B444)  `;
      a = "-";
      b = "-2";
    }

    if (query === "Heart") {
      desc = `Attack that misses by 1 hits the torso instead. 
        Heart, lungs, kidneys, etc. Increase wounding modifier for imp or pi attack to x3. Increase wounding modifier for tbb attack to ×2. cr is only x1, if caused shock roll vs. knockdown, -5 if major wound, other attacks cannot target the vitals.
        `;
      a = "-";
      b = "-5";
    }

    const embed = new EmbedBuilder();

    embed
      .setColor(0x5506ce)
      .setTitle(query)
      .setDescription(desc)
      .addFields(
        { name: "Roll", value: a, inline: true },
        { name: "Penalty", value: b, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
