"use strict";

var createServer=require('./httpServer');
var addSchematicToWorld=require('schematic-to-world');
var Vec3=require("vec3").Vec3;
var UserError=require('flying-squid').UserError;

module.exports.server=function(){
  this.schematics=createServer(this.settings.port);
};

module.exports.player=function(player,serv)
{
  var self=this;
  player.commands.add({
    base: 'loadSchema',
    info: 'load a schema, go in '+self.settings.endPoint+' to upload a schematic',
    usage: '/loadSchema <x> <y> <z> <schemaName>',
    op: true,
    parse(str) {
      const results = str.match(/^(~|~?-?[0-9]+) (~|~?-?[0-9]+) (~|~?-?[0-9]+) (.+)$/);
      if(!results) return false;
      return results;
    },
    action(params) {
      let res = params.slice(1, 4);
      res = res.map((val, i) => serv.posFromString(val, player.position[['x','y','z'][i]] / 32));
      let pos=new Vec3(res[0], res[1], res[2]).floored();
      let schemaName=params[4];
      if(!self.schematics[schemaName])
        throw new UserError(schemaName+" isn't an available schema");

      addSchematicToWorld(self.schematics[schemaName],player.world,pos)
        .then(chunks => serv.reloadChunks(player.world,chunks))
        .then(() => player.chat("Schema loaded !"))
    }
  });

  player.commands.add({
    base: 'listSchemas',
    info: 'list schemas',
    usage: '/listSchemas',
    op: true,
    action() {
      player.chat("Available schemas: "+Object.keys(self.schematics).join(", "));
    }
  });
};
