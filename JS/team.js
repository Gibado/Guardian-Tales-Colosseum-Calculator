var Team = {
    // Creates a team of units of the given size and the total dps and toughness 
    createTeam: function(size, dps, toughness) {
        return {
            units: this.createUnit(size, dps / size, toughness / size),
            size: function() {
                return this.units.length
            },
            dps: function() {
                var total = 0;
                for (var i = 0; i < this.units.length; i++) {
                    total += this.units[i].dps;
                }
                return total;
            },
            toughness: function() {
                var total = 0;
                for (var i = 0; i < this.units.length; i++) {
                    total += this.units[i].toughness;
                }
                return total;
            },
            // Returns a duplicate of this team
            clone: function() {
                return Team.cloneTeam(this);
            }
        };
    },
    // Creates an array of units with the given dps and toughness
    createUnit: function(count, dps, toughness) {
        var team = [];
        for (var i = 0; i < count; i++) {
            team.push({ dps: dps, toughness: toughness });
        }
        return team;
    },
    // Creates a duplicate of the given team
    cloneTeam: function(team) {
        return this.createTeam(team.size(), team.dps(), team.toughness());
    }
};