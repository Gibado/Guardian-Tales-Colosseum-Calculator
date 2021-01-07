var model = {
    friendlyTeam: null,
    enemyTeam: null,

    // Pulls team details from the page
    getTeam: function(div) {
        var numbers = div.getElementsByTagName('input');
        return Team.createTeam(parseInt(numbers[0].value), parseInt(numbers[1].value), parseInt(numbers[2].value));
    },

    // Calculates how quickly all characters will die
    battle: function() {

    },

    // Updates the model teams
    update: function() {
        this.friendlyTeam = this.getTeam(document.getElementById('myTeam'));
        this.enemyTeam = this.getTeam(document.getElementById('enemyTeam'));
    },

    // Updates the page with battle results
    updateResults: function(results) {

    }
};