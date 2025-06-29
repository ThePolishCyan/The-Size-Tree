addLayer("p", {
    name: "OD Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#BAFFBE",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "OD points", // Name of prestige currency
    baseResource: "vectors", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "0", description: "0: Reset for 0D points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}, upgrades: {
        rows: 3,
        cols: 5,       
        11: {
            title: "Vector Cloning I",
            description: "Double your vector gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Vector Scale Cloning I",
            description: "0D Points boost vector gain.",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
        },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        13: {
            title: "0D Gain I",
            description: "Vectors boost 0D Points gain.",
            cost: new Decimal(16),
            effect() {
                return player.points.add(1).pow(0.15)
            },
        },
        14: {
            title: "Vector Scale Cloning II",
            description: "Vectors boost vector gain.",
            cost: new Decimal(40),
            effect() {
                return player.points.add(1).pow(0.01)
            },
        },
    },
        tabFormat: [
            "main-display",
            "prestige-button",
            ["display-text", () => `<div style="margin-top:10px;">Total 0D Points earned: ${format(player.p.total)}</div>`],
            ["display-text", () => " "],
            "upgrades"
        ],
})
addLayer("s", {
    name: "Space Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        timer: 0,
    }},
    color: "#2C3E50",
    requires: new Decimal(64), // Can be a function that takes requirement increases into account
    resource: "space points", // Name of prestige currency
    baseResource: "OD points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        branches: ["p"],
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: Reset for Space Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}, upgrades: {
        11: {
            title: "More Than Infinitely Small I",
            description: "Space Points boost vector gain.",
            cost: new Decimal(1),
            effect() {
                return player.s.total.add(1).pow(0.5)
            },
        },
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => `<div style="margin-top:10px;">Total Space Points earned: ${format(player.s.total)}</div>`],
        ["display-text", () => " "],
        "upgrades"
    ],
},)


