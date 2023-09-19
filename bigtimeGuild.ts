import prisma from "@/lib/prisma/prisma";
// ADD guilds here and run this to add it to the DB.
const guilds = [
  {
    name: "ChronoDAO",
    tag: "CHR",
    discordUrl: "https://discord.gg/chronodao",
  },
  {
    name: "Vast Impact Gaming",
    tag: "VIG",
    discordUrl: "https://discord.gg/EeQ3g6eMvz",
  },
  {
    name: "RETURNERS",
    tag: "",
    discordUrl: "https://discord.gg/YCVC3exUUw",
  },
  {
    name: "Alpha Origins",
    tag: "AO",
    discordUrl: "https://discord.gg/alphaorigins",
  },
  {
    name: "Big Time Bulls Guild",
    tag: "BTBG",
    discordUrl: "https://discord.gg/nGuPCWdjFS",
  },
  {
    name: "BigTimeWarriors",
    tag: "BT-W",
    discordUrl: "https://discord.gg/BigTimeWarriors",
  },
  {
    name: "Gamers United Nation",
    tag: "GUN",
    discordUrl: "https://discord.gg/kr8rmmEgDk",
  },
  {
    name: "FAM",
    tag: "FAM",
    discordUrl: "",
  },
  {
    name: "Dovah Gaming Guild",
    tag: "Dovah",
    discordUrl: "https://discord.gg/TQwrfJ2Kwx",
  },
  {
    name: "Space Phoenix Guild",
    tag: "SXG",
    discordUrl: "",
  },
  {
    name: "Yield Guild Games",
    tag: "YGG",
    discordUrl: "https://discord.gg/YGG",
  },
  {
    name: "V Empire Gaming Guild",
    tag: "VEMP",
    discordUrl: "https://discord.gg/vemp",
  },
  {
    name: "X BORG",
    tag: "",
    discordUrl: "",
  },
  {
    name: "AMG DAO",
    tag: "",
    discordUrl: "",
  },
  {
    name: "BigTime JPN",
    tag: "",
    discordUrl: "",
  },
];

export async function seedGuilds() {
  for (const guild of guilds) {
    try {
      const existingGuild = await prisma.guild.findUnique({
        where: {
          name: guild.name,
        },
      });

      if (!existingGuild) {
        await prisma.guild.create({
          data: guild,
        });
        console.log(`Added guild: ${guild.name}`);
      } else {
        console.log(`guild ${guild.name} already exists, skipping.`);
      }
    } catch (error: any) {
      console.error(`Error adding guild ${guild.name}: ${error.message}`);
    }
  }
}
