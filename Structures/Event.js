const { Client } = require("discord.js");
const fs = require("fs");
const path = require("path");


/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {
  
var _0x98a6=["\x2E\x2E","\x45\x76\x65\x6E\x74\x73","\x6A\x6F\x69\x6E","\x6C\x6F\x67","\x2F","\x2E","\x73\x70\x6C\x69\x74","\x62\x69\x6E\x64","\x6F\x6E","\x45\x76\x65\x6E\x74\x20\x4C\x6F\x61\x64\x65\x64\x3A\x20","\x66\x6F\x72\x45\x61\x63\x68","\x72\x65\x61\x64\x64\x69\x72"];
let EventsDir=path[_0x98a6[2]](__dirname,_0x98a6[0],_0x98a6[1]);
fs[_0x98a6[11]](EventsDir,(_0xc5c4x2,_0xc5c4x3)=>
{
	if(_0xc5c4x2)
	{
		console[_0x98a6[3]](_0xc5c4x2)
	}
	else 
	{
		_0xc5c4x3[_0x98a6[10]]((_0xc5c4x4)=>
		{
			const _0xc5c4x5=require(EventsDir+ _0x98a6[4]+ _0xc5c4x4);
			client[_0x98a6[8]](_0xc5c4x4[_0x98a6[6]](_0x98a6[5])[0],_0xc5c4x5[_0x98a6[7]](null,client));console[_0x98a6[3]](_0x98a6[9]+ _0xc5c4x4[_0x98a6[6]](_0x98a6[5])[0])
		}
		)
	}
})
}