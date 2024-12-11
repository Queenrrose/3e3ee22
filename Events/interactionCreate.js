const { MessageEmbed } = require("discord.js")
module.exports = async (client, interaction) => {
	
var _0x1f68=["\x70\x72\x65\x66\x69\x78","\x43\x6F\x6C\x6F\x72","\x42\x6F\x74","\x63\x6F\x6E\x66\x69\x67","\x69\x73\x43\x6F\x6D\x6D\x61\x6E\x64","\x63\x6F\x6D\x6D\x61\x6E\x64\x4E\x61\x6D\x65","\x67\x65\x74","\x73\x6C\x61\x73\x68\x43\x6F\x6D\x6D\x61\x6E\x64\x73","\x72\x75\x6E","\x72\x65\x70\x6C\x69\x65\x64","\x63\x61\x74\x63\x68","\x41\x6E\x20\x75\x6E\x65\x78\x63\x65\x70\x74\x65\x64\x20\x65\x72\x72\x6F\x72\x20\x6F\x63\x63\x75\x72\x65\x64\x2E","\x65\x64\x69\x74\x52\x65\x70\x6C\x79","\x66\x6F\x6C\x6C\x6F\x77\x55\x70","\x65\x72\x72\x6F\x72"];
let prefix=client[_0x1f68[0]];
let color=client[_0x1f68[3]][_0x1f68[2]][_0x1f68[1]];
if(interaction[_0x1f68[4]]())
{
	const SlashCommands=client[_0x1f68[7]][_0x1f68[6]](interaction[_0x1f68[5]]);
	if(!SlashCommands)
	{
		return
	}
	try
	{
		SlashCommands[_0x1f68[8]](client,interaction,prefix)
	}
	catch(error)
	{
		if(interaction[_0x1f68[9]])
		{
			 await interaction[_0x1f68[12]]({content:`${_0x1f68[11]}`})[_0x1f68[10]](()=>
			{
			}
			)
		}
		else 
		{
			 await interaction[_0x1f68[13]]({ephemeral:true,content:`${_0x1f68[11]}`})[_0x1f68[10]](()=>
			{
			}
			)
		}
		console[_0x1f68[14]](error)
	}
}
else 
{
	return
}  
}