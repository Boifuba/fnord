const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mass-combat")
    .setDescription("Mass Combat rules")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reconnaissance")
        .setDescription("Choose strategy to start a battle")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("ChooseS")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("attacks")
        .setDescription("Choose strategy to start a battle")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("ChooseS")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
    subcommand
      .setName("defenses")
      .setDescription("Choose strategy to start a battle")
      .addStringOption((option) =>
        option
          .setName("query")
          .setDescription("ChooseS")
          .setRequired(true)
          .setAutocomplete(true)
      )
  )    .addSubcommand((subcommand) =>
  subcommand
    .setName("retreat")
    .setDescription("Choose strategy to start a battle")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("ChooseS")
        .setRequired(true)
        .setAutocomplete(true)
    )
) .addSubcommand((subcommand) =>
subcommand
  .setName("raid-and-skirmish")
  .setDescription("Choose strategy to start a battle")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("ChooseS")
      .setRequired(true)
      .setAutocomplete(true)
  )
).addSubcommand((subcommand) =>
subcommand
  .setName("special-cases")
  .setDescription("Choose strategy to start a battle")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("ChooseS")
      .setRequired(true)
      .setAutocomplete(true)
  )
),

  async autocomplete(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "reconnaissance") {
      const value = interaction.options.getFocused().toLowerCase();

      let choices = [
        "Pitched Battle",
        "Encounter Battle",
        "Confusion",
        "Ambush",
      ];

      const filtered = choices
        .filter((choice) => choice.toLowerCase().includes(value))
        .slice(0, 25);

      if (!interaction) return;

      await interaction.respond(
        filtered.map((choice) => ({ name: choice, value: choice }))
      );
    }




    ////attacks
    if (subcommand === "attacks") {
        const value = interaction.options.getFocused().toLowerCase();
  
        let choices = [
          "All-Out Attack",
          "Attack",
          "Deliberate Attack",
          "Indirect Attack",
        ];
  
        const filtered = choices
          .filter((choice) => choice.toLowerCase().includes(value))
          .slice(0, 25);
  
        if (!interaction) return;
  
        await interaction.respond(
          filtered.map((choice) => ({ name: choice, value: choice }))
        );
      }

      ////defenses
    if (subcommand === "defenses") {
        const value = interaction.options.getFocused().toLowerCase();
  
        let choices = [
          "All-Out Defense",
          "Defense",
          "Deliberate Defense",
          "Mobile Defense",
          "Parley",
          "Rally"
        ];
  
        const filtered = choices
          .filter((choice) => choice.toLowerCase().includes(value))
          .slice(0, 25);
  
        if (!interaction) return;
  
        await interaction.respond(
          filtered.map((choice) => ({ name: choice, value: choice }))
        );
      }
       ////retreat
    if (subcommand === "retreat") {
        const value = interaction.options.getFocused().toLowerCase();
  
        let choices = [
          "Fighting Retreat",
          "Full Retreat",
                 ];
  
        const filtered = choices
          .filter((choice) => choice.toLowerCase().includes(value))
          .slice(0, 25);
  
        if (!interaction) return;
  
        await interaction.respond(
          filtered.map((choice) => ({ name: choice, value: choice }))
        );
      }
        ////raid and skirmishes
    
    
    
    
        if (subcommand === "raid-and-skirmish") {
      const value = interaction.options.getFocused().toLowerCase();

      let choices = [
        "Raid",
        "Skirmish",
        
      ];

      const filtered = choices
        .filter((choice) => choice.toLowerCase().includes(value))
        .slice(0, 25);

      if (!interaction) return;

      await interaction.respond(
        filtered.map((choice) => ({ name: choice, value: choice }))
      );
    }
        ////special

        if (subcommand === "special-cases") {
          const value = interaction.options.getFocused().toLowerCase();
    
          let choices = [
            `“Deliberate” Strategies and Parleys`,
            "Parleys",
            "Stalemate",
            "No Battle"          
          ];
    
          const filtered = choices
            .filter((choice) => choice.toLowerCase().includes(value))
            .slice(0, 25);
    
          if (!interaction) return;
    
          await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
          );
        }
  },

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "reconnaissance") {
      const query = interaction.options.getString("query");
      if (query === "Ambush") {
        desc =
          "The ambushers’ commander may select any strategy but a defense strategy on the first round. In addition, the ambushers receive defensive bonuses, which are normally only allowed for defenses. Treat the other side as suffering from confusion (above).";
      }
      if (query === "Pitched Battle") {
        desc = "Both sides are free to pick any battle strategy.";
      }
      if (query === "Encounter Battle") {
        desc =
          "Neither side may select Deliberate Attack or Deliberate Defense. A mobile force cannot choose a retreat strategy, or any defense strategy other than Mobile Defense, on the first round.";
      }
      if (query === "Confusion") {
        desc =
          "The commander of a “confused” force must choose either Rally or Full Retreat on the first round. If he chooses Rally, then he gets a Leadership roll at the end of each round; success means he rallies his force and is free to choose a strategy other than Rally or Retreat on later rounds";
      }
      const embed = new EmbedBuilder();

      embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    //attacks
    if (subcommand === "attacks") {
        const query = interaction.options.getString("query");
        if (query === "All-Out Attack") {
          desc =
            'Charge! A commander who chooses this option adds a +2 battle strategy modifier. If he wins the round, his forces also inflict +5% casualties on the enemy. But there’s a cost: Unless he wins by sufficient margin to take 0% losses, any casualties his force takes are doubled.';
        }
        if (query === "Attack") {
          desc = `This is an order to advance – or, if the forces are already in contact, to press hard against the enemy. The commander is assumed to be using all appropriate battlefield tactics for the period and troops involved. There are no special modifiers, making this a safe “default” option for any commander`
        }
        if (query === "Deliberate Attack") {
          desc =
            "This is a slow but carefully planned attack, aimed at reducing any advantage the defender has. It’s an option only in a pitched battle or a siege, and never available to a side that starts the battle confused. Any benefits that the defender would receive from Defense Bonus (but not Position Bonus) are halved, rounding up. This makes a Deliberate Attack extremely useful against well-prepared defenders. The attacker also receives a +1 battle strategy modifier – and if he has Artillery Superiority, he gets an extra +1. However, a Deliberate Attack is slow to develop, and thus allows the other side to change its strategy; see Special Cases (pp. 35-36).";
                }
        if (query === "Indirect Attack") {
          desc =
            `This represents the commander detaching part of his force on a wide outflanking maneuver, faking a retreat, or performing some other risky-but-cunning move. He gets a -3 battle strategy modifier (only -2 if he enjoys C3I Superiority). If he wins, double his margin of victory; e.g., if the attacker succeeds by 5 and the defender succeeds by 1, the margin of victory is 4, which would then be doubled to 8. This allows a good or lucky general to achieve a truly spectacular
            result! Repeated Indirect Attacks offer diminishing returns, however, as the foe will be wary of further tricks. On the second and subsequent Indirect Attacks, multiply the margin of victory by only 1.5 (round up); in addition, a force suffers an extra -2 battle strategy modifier if it follows one Indirect Attack with another on the very next round.`;
            
        }
        const embed = new EmbedBuilder();
  
        embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
////defenses
      if (subcommand === "defenses") {
        const query = interaction.options.getString("query");
        if (query === "All-Out Defense") {
          desc =
            "The ambushers’ commander may select any strategy but a defense strategy on the first round. In addition, the ambushers receive defensive bonuses, which are normally only allowed for defenses. Treat the other side as suffering from confusion (above).";
        }
        if (query === "Defense") {
          desc = "Both sides are free to pick any battle strategy.";
        }
        if (query === "Deliberate Defense") {
          desc =
            "Neither side may select Deliberate Attack or Deliberate Defense. A mobile force cannot choose a retreat strategy, or any defense strategy other than Mobile Defense, on the first round.";
        }
        if (query === "Mobile Defense") {
          desc =
            "The commander of a “confused” force must choose either Rally or Full Retreat on the first round. If he chooses Rally, then he gets a Leadership roll at the end of each round; success means he rallies his force and is free to choose a strategy other than Rally or Retreat on later rounds";
        }
        if (query === "Parley") {
            desc =
              "The commander of a “confused” force must choose either Rally or Full Retreat on the first round. If he chooses Rally, then he gets a Leadership roll at the end of each round; success means he rallies his force and is free to choose a strategy other than Rally or Retreat on later rounds";
          }
          if (query === "Rally") {
            desc =
              "The commander of a “confused” force must choose either Rally or Full Retreat on the first round. If he chooses Rally, then he gets a Leadership roll at the end of each round; success means he rallies his force and is free to choose a strategy other than Rally or Retreat on later rounds";
          }
        const embed = new EmbedBuilder();
  
        embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
      //retreat 
      if (subcommand === "retreat") {
        const query = interaction.options.getString("query");
        if (query === "Fighting Retreat") {
          desc =
            `This is an attempt to fall back while launching spoiling attacks to keep the enemy at bay. It gives the commander a +3 battle strategy modifier. If he wins or ties the round, his force escapes. Otherwise, it’s still fighting, the
            enemy gains an extra +1 PB, and any casualties the retreating force sustains this round also apply to its logistic force! Win or lose, any casualties the enemy suffers are halved (round down).`
        }
        if (query === "Full Retreat") {
          desc = `This is an attempt to withdraw as quickly as possible without the retreat degenerating into a rout. It gives the commander a +8 battle strategy modifier and his force takes 10% fewer casualties than usual, but any casualties sustained apply to both his fighting force and his logistic force.
          Regardless of who “wins” the round, the retreating force loses the battle, any survivors escape, and it inflicts no casualties at all on the enemy! The retreating force commander takes an extra -2 battle strategy modifier when performing a Full Retreat as a result of confusion. In any situation where retreat  would be difficult – e.g., a land force must retreat over a narrow bridge – the GM may apply an additional -2 or worse.`
        }
     
        const embed = new EmbedBuilder();
  
        embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
         //raid and skirmish 
         if (subcommand === "raid-and-skirmish") {
          const query = interaction.options.getString("query");
          if (query === "Raid") {
            desc =
              `Hit the enemy hard, aiming to inflict losses or dislodge the foe rather than to seize new ground. Add an extra +1 battle strategy modifier for each of Air Superiority, Cavalry Superiority, Naval Superiority, and Recon Superiority. A winning Raid can reduce enemy PB but not gain PB for the raiding force. In addition, if the winner inflicts any casualties, he may opt to apply these to the enemy’s logistic force instead of to the opposing fighting force.`
          }

          if (query === "Skirmish") {
            desc = 
              `Exchange harassing fire at long range, falling back if attacked. The commander receives a +2 battle strategy modifier – and if he has Air Superiority, Artillery Superiority, and/or Fire Superiority, he gets another +1 (not +1 each!). Winning          with a Skirmish strategy doesn’t gain PB, and the margin of victory is halved (round down). Win or lose, however, the skirmishing side takes 5% fewer casualties; e.g., if the outcome would normally be 15% casualties, they’d suffer only 10%.`
          }
       
          const embed = new EmbedBuilder();
    
          embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
          await interaction.reply({ embeds: [embed], ephemeral: true });
        }
          //special
          if (subcommand === "special-cases") {
            const query = interaction.options.getString("query");
            if (query === "Deliberate” Strategies and Parleys") {
              desc =
                `If one commander chose any of Deliberate Attack, Deliberate Defense, or Parley while the other didn’t (and, in the case of Parley, refused to talk), then the commander who chose such a slow-moving strategy loses the momentum. This permits his opponent to change his own strategy to something different immediately, if he wishes. A commander with Stubbornness likely won’t change his mind, though!`
            }
  
            if (query === "Parleys") {
              desc = 
                `If one commander chose Parley and the other commander opted to accept, then the battle pauses while they talk; don’t bother with Strategy rolls. Similarly, if both commanders chose Parley, the battle halts for a round as the sides talk under flag of truce. In either case, both sides hold position, and any Position Bonuses are retained if negotiations break down and the battle resumes`
            }
            if (query === "Stalemate") {
              desc = 
                `If both commanders picked a defense strategy other than Parley, then change both strategies to Skirmish, as no one is serious about attacking that round.`
            }
            if (query === "No Battle") {
              desc = 
                `If both commanders picked a retreat strategy, or if one chose a retreat strategy and the other selected a defense strategy, then the battle ends and the retreating force(s) break contact and escape without any casualties this round. Future contact requires further movement and reconnaissance`
            }
           
            const embed = new EmbedBuilder();
      
            embed.setColor(0x5506ce).setTitle(query).setDescription(desc);
            await interaction.reply({ embeds: [embed], ephemeral: true });
          }
  },
};

