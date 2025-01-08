class User {
    private username?: string;
    private lvl?: number;
    private Stats: Array<any> = [
        { name: "Agility", value: 10 },
        { name: "Constitution", value: 10 },
        { name: "Dexterity", value: 10 },
        { name: "Endurace", value: 10 },
        { name: "Strength", value: 10 },
        { name: "Charisma", value: 10 },
        { name: "Intelligence", value: 10 },
        { name: "Soul", value: 10 },
        { name: "Perception", value: 10 },
        { name: "Wisdom", value: 10 },
    ];

    public getUsername() {
        return this.username;
    }
    public updateUsername(newUsername: string) {
        this.username = newUsername;
    }
    public getLvl() {
        return this.lvl;
    }
    public updateLvl(newLvl: number) {
        this.lvl = newLvl;
    }
    public getStats() {
        return this.Stats;
    }
    public getOneStat(whichStat: number) {
        return this.Stats[whichStat];
    }
    public updateOneStat(whichStat: number, howUpgraded: number) {
        let newStats = this.Stats;
        newStats[whichStat].values = howUpgraded;
    }
    constructor(newClass: User) {
        this.username = newClass.getUsername();
    }
}

export default User;
