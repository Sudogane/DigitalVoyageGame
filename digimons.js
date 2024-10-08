

module.exports = [{
		did: 1,
		species: 'Chicchimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/f/f2/Chicchimon_vg.gif',
		description: 'A small Digimon which looks like a chick.\nIt’s still physically weak and isn’t suitable for an actual fight, but even though it’s an In-Training Digimon, we can see how it’ll turn out to be after Digivolving.',
		form: 0,
		attribute: 0,
		family: 6,
		element: 6,
		baseStats: {
			hp: 81,
			mp: 87,
			attack: 60,
			defense: 50,
			speed: 40
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Hyokomon']
		},
		moves: [0],
		traits: []
	},
	{
		did: 2,
		species: 'Koromon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/f/f1/Koromon_vg.gif',
		description: "A small Digimon whose downy hair has fallen out, and its body has become one size larger Although it's small, it's energetic just like other Dragon Digimon.",
		form: 0,
		attribute: 0,
		family: 0,
		element: 0,
		baseStats: {
			hp: 66,
			mp: 67,
			attack: 47,
			defense: 35,
			speed: 28
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Agumon', 'Agumon (2006)']
		},
		moves: [0],
		traits: []
	},
	{
		did: 3,
		species: 'Tsunomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/a/a9/Tsunomon_vg.gif',
		description: "A small Digimon with a solid horn on top of its head The Digimon is covered with a flowing coat and is very mischievous, but, it isn't good at actual battles yet.",
		form: 0,
		attribute: 0,
		family: 2,
		element: 5,
		baseStats: {
			hp: 64,
			mp: 67,
			attack: 51,
			defense: 33,
			speed: 37
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Gabumon', 'Elecmon', 'Gabumon (Black)']
		},
		moves: [0],
		traits: []
	},
	{
		did: 4,
		species: 'Poyomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/c/c4/Poyomon_vg.gif',
		description: "This Digimon has a transparent body and drifts on the Internet Sea Among all the Digimon, it's got the most primitive body structure Therefore, it's been getting all the attention as a key to solve the evolution of Digimon.",
		form: 0,
		attribute: 0,
		family: 4,
		element: 2,
		baseStats: {
			hp: 70,
			mp: 62,
			attack: 37,
			defense: 38,
			speed: 26
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Tokomon']
		},
		moves: [0, 'Frothy Spit', 'Bubble', 'Rainbow Spit'],
		traits: ['Mist Cape 1']
	},
	{
		did: 5,
		species: 'Tokomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/3/3c/Tokomon_vg.gif',
		description: "A small size Digimon with short arms and legs sticking out of the lower body It's very rare for a small size Digimon to have arms and legs Its round body is very cute.",
		form: 0,
		attribute: 0,
		family: 3,
		element: 9,
		baseStats: {
			hp: 60,
			mp: 59,
			attack: 36,
			defense: 29,
			speed: 38
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 3200
				},
				level: 5
			},
			from: [4],
			to: ['Patamon', 'Tsukaimon']
		},
		moves: [0, 'Frothy Spit', 'Top Gun', 'Rainbow Spit'],
		traits: ['Sylph Aegis 1']
	},
	{
		did: 6,
		species: 'Tanemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/2a/Tanemon_vg.gif',
		description: "A small Digimon with leaves on top of its head Its personality is timid and isn't fond of fighting When threatened, it digs a hole in the ground skillfully with its clawed feet, protecting itself by burying its body in the ground.",
		form: 0,
		attribute: 0,
		family: 8,
		element: 3,
		baseStats: {
			hp: 63,
			mp: 82,
			attack: 38,
			defense: 31,
			speed: 30
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 3200
				},
				level: 5
			},
			from: ['Yuramon'],
			to: ['Palmon', 'Floramon']
		},
		moves: [0, 'Frothy Spit', 'Rain of Poller', 'Rainbow Spit'],
		traits: ['Psychic 1']
	},
	{
		did: 7,
		species: 'Pagumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/68/Pagumon_vg.gif',
		description: 'Since the Digimon is an In-Training Digimon from the Dark species, it loves mischief and pranks It has a slightly cynical personality It can move its ears skillfully to nip at things and fly in the sky by flapping them.',
		form: 0,
		attribute: 1,
		family: 9,
		element: 7,
		baseStats: {
			hp: 71,
			mp: 63,
			attack: 43,
			defense: 30,
			speed: 35
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: [
				'DemiDevimon',
				'Gazimon',
				'Gizamon',
				'Goburimon',
				'SnowGoburimon',
				'Shamamon',
				'Dracmon'
			]
		},
		moves: [0, 'Frothy Spit', 'Pit Crusher', 'Rainbow Spit'],
		traits: ['Protect 1']
	},
	{
		did: 8,
		species: 'Kapurimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/f/fa/Kapurimon_vg.gif',
		description: 'A  small size Digimon with a metal helmet on its head Among In-Training Digimon, it has superior durability It also possesses bat-like abilities and moves around even in the dark by manipulating sonar skillfully.',
		form: 0,
		attribute: 0,
		family: 5,
		element: 10,
		baseStats: {
			hp: 78,
			mp: 65,
			attack: 46,
			defense: 42,
			speed: 28
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Gotsumon', 'Hagurumon', 'Kotemon']
		},
		moves: [0, 'Frothy Spit', 'Boost Tackle', 'Rainbow Spit'],
		traits: ['Ether Eddy 1']
	},
	{
		did: 9,
		species: 'Kuramon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/8/82/Kuramon_vg.gif',
		description: "A mysterious Digimon which suddenly appeared in the computer network It's said that the Digimon was born from an egg filled with humanity's destructive instincts It multiplies like a germ and destroys networks.",
		form: 0,
		attribute: 0,
		family: 9,
		element: 7,
		baseStats: {
			hp: 65,
			mp: 65,
			attack: 34,
			defense: 28,
			speed: 29
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Keramon']
		},
		moves: [0, 'Death Cannon', 'Glare Eye', 'Rainbow Spit'],
		traits: ['Dark Breath 1']
	},
	{
		did: 10,
		species: 'Puttimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/5/5a/Puttimon_vg.gif',
		description: "The Digimon is popular especially among Tamers who are eager to grow Digimon since the rumor says that it brings happiness It's a fluffy cute Digimon, but sometimes does some mischief Some fans say that's part of its charm.",
		form: 0,
		attribute: 0,
		family: 6,
		element: 6,
		baseStats: {
			hp: 69,
			mp: 70,
			attack: 45,
			defense: 28,
			speed: 36
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Kyupimon']
		},
		moves: [0, 'Frothy Spit', 'Holy Cannon', 'Rainbow Spit'],
		traits: ['Halo 1']
	},
	{
		did: 11,
		species: 'Chibomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/6d/Chibomon_vg.gif',
		description: 'This Digimon is small and physically weak, yet it possesses potential to Digivolve into many different Digimon from the Dragon species Researchers and Digimon find it very valuable.',
		form: 0,
		attribute: 0,
		family: 0,
		element: 0,
		baseStats: {
			hp: 68,
			mp: 56,
			attack: 55,
			defense: 33,
			speed: 31
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['DemiVeemon']
		},
		moves: [0, 'Frothy Spit', 'Sonic Counter', 'Rainbow Spit'],
		traits: ['Speed 1']
	},
	{
		did: 12,
		species: 'Dorimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/c/c8/Dorimon_vg.gif',
		description: "A wild Digimon which can't be tamed Its personality is a little reckless Despite its small body, it's unfazed by danger and stands up against enemies bravely Many proud Tamers who center on battles prefer this Digimon.",
		form: 0,
		attribute: 0,
		family: 2,
		element: 5,
		baseStats: {
			hp: 75,
			mp: 24,
			attack: 52,
			defense: 41,
			speed: 37
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 3200
				},
				level: 5
			},
			from: ['Dodomon'],
			to: ['Dorumon']
		},
		moves: [0, 'Frothy Spit', 'Tiny Metal', 'Rainbow Spit'],
		traits: ['Powerful 1']
	},
	{
		did: 13,
		species: 'Calumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/8/86/Calumon_vg.gif',
		description: 'This is digi-entelecheia (the power of digivolution) given Digimon form It is said to have the power to help other Digimon digivolve It does not Digivolve or attack by itself.',
		form: 0,
		attribute: 0,
		family: 6,
		element: 6,
		baseStats: {
			hp: 790,
			mp: 2298,
			attack: 190,
			defense: 180,
			speed: 400
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: []
		},
		moves: [
			0,
			'Power of Love',
			'Light Wave',
			'Absolute Healing',
			'Kurumon Prayer'
		],
		traits: ['D-Entelechy', 'Status Barrier', 'Dodge Dance', 'Retreat']
	},
	{
		did: 14,
		species: 'Gigimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/ec/Gigimon_vg.gif',
		description: "This In-Training Digimon has legs and a tail, and small wings on its head Though small in size, it's a brilliant Dragon Digimon It's aggressive, so even Tamers should handle it with caution.",
		form: 0,
		attribute: 0,
		family: 0,
		element: 0,
		baseStats: {
			hp: 72,
			mp: 61,
			attack: 50,
			defense: 39,
			speed: 29
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Guilmon', 'BlackGuilmon']
		},
		moves: [0, 'Frothy Spit', 'Mega Napalm', 'Rainbow Spit'],
		traits: ['Fire Aura 1']
	},
	{
		did: 15,
		species: 'Gummymon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/f/f4/Gummymon_vg.gif',
		description: "Kokomon's twin Digimon. It's a very active Digimon, but easily gets along with quite Kokomon They always hang out together and look a lot alike, but Gummymon is green and has one horn.",
		form: 0,
		attribute: 0,
		family: 6,
		element: 6,
		baseStats: {
			hp: 61,
			mp: 73,
			attack: 35,
			defense: 33,
			speed: 35
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 3200
				},
				level: 5
			},
			from: ['Zerimon'],
			to: ['Terriermon']
		},
		moves: [0, 'Frothy Spit', 'Bubble', 'Rainbow Spit'],
		traits: ['Protect 1']
	},
	{
		did: 16,
		species: 'Kokomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/a/a5/Kokomon_vg.gif',
		description: "Gummymon's twin Digimon. It's a very shy Digimon, but easily gets along with the energetic Kokomon They always hang out together and look a lot alike, but Kokomon is brown and has three horns.",
		form: 0,
		attribute: 0,
		family: 6,
		element: 6,
		baseStats: {
			hp: 75,
			mp: 67,
			attack: 56,
			defense: 40,
			speed: 39
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 3200
				},
				level: 5
			},
			from: ['Cocomon'],
			to: ['Lopmon']
		},
		moves: [0, 'Frothy Spit', 'Bubble', 'Rainbow Spit'],
		traits: ['Protect 1']
	},
	{
		did: 17,
		species: 'Tsumemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/ef/Tsumemon_vg.gif',
		description: "A rough Digimon which ruins network at great speed It's hard to catch because it can move very fast Just like Kuramon, its eye radiates with eerie light",
		form: 0,
		attribute: 1,
		family: 1,
		element: 7,
		baseStats: {
			hp: 75,
			mp: 67,
			attack: 56,
			defense: 40,
			speed: 39
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 3200
				},
				level: 5
			},
			from: ['Kuramon'],
			to: ['Keramon']
		},
		moves: [0, 'Nail Scratch', 'Dark Claw', 'Rainbow Spit'],
		traits: ['Powerful 1']
	},
	{
		did: 18,
		species: 'Minomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/f/fd/Minomon_vg.gif',
		description: "The Digimon wears a hard straw raincoat and protects its body It's basically a quiet Digimon It moves by hanging on to bigger Digimon using its long vines.",
		form: 0,
		attribute: 0,
		family: 8,
		element: 3,
		baseStats: {
			hp: 63,
			mp: 69,
			attack: 41,
			defense: 42,
			speed: 26
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 3200
				},
				level: 5
			},
			from: ['Leafmon'],
			to: ['Wormmon', 'Kunemon']
		},
		moves: [0, 'Power Blast', 'Frothy Spit', 'Rainbow Spit'],
		traits: ['Protect 1']
	},
	{
		did: 19,
		species: 'Wanyamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/3/32/Wanyamon_vg.gif',
		description: 'This Digimon was produced by fusing pet data such as cats and dogs It can move pretty quickly, so you need to be careful not to let it escape But, once you take care of it well, it will become attached to you.',
		form: 0,
		attribute: 0,
		family: 2,
		element: 8,
		baseStats: {
			hp: 65,
			mp: 58,
			attack: 48,
			defense: 24,
			speed: 38
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Gaomon']
		},
		moves: [0, 'Sharp Fang', 'Frothy Spit', 'Rainbow Spit'],
		traits: ['Mother Earth 1']
	},
	{
		did: 20,
		species: 'Budmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/18/Budmon_vg.gif',
		description: "A Digimon which looks like a flower bud It was produced by mixing several poisonous plants Usually, it moves around in the air on a leaf, and won't initiate attacks But, when angry, it may attack with its thorns.",
		form: 0,
		attribute: 0,
		family: 8,
		element: 3,
		baseStats: {
			hp: 59,
			mp: 75,
			attack: 42,
			defense: 31,
			speed: 32
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Lalamon']
		},
		moves: [0, 'Lullaby', 'Frothy Spit', 'Rainbow Spit'],
		traits: ['Thunder Sign 1']
	},
	{
		did: 21,
		species: 'Botamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/2f/Botamon_vg.gif',
		description: 'A newly-born Digimon which looks like a flower bud Its slime-like soft body is covered with fuzzy black hairs.',
		form: 0,
		attribute: 0,
		family: 6,
		element: 7,
		baseStats: {
			hp: 66,
			mp: 60,
			attack: 47,
			defense: 32,
			speed: 29
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Koromon']
		},
		moves: [0, 'Giga Breath', 'Frothy Spit', 'Rainbow Spit'],
		traits: ['Psychic 1']
	},
	{
		did: 22,
		species: 'Sunmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/7/77/Sunmon_vg.gif',
		description: 'Its body taken on the form of the Sun, and its head is like a flame It has a bright personality and floats around in the air.',
		form: 0,
		attribute: 0,
		family: 6,
		element: 6,
		baseStats: {
			hp: 71,
			mp: 68,
			attack: 51,
			defense: 39,
			speed: 33
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Coronamon']
		},
		moves: [0, 'Starlight', 'Frothy Spit', 'Rainbow Spit'],
		traits: ['Fire Aura 1']
	},
	{
		did: 23,
		species: 'Moonmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/f/ff/Moonmon_vg.gif',
		description: 'A cute Digimon with a transparent body like a drop of water and slightly-flushed cheeks. It has a pure heart It easily gets affected by the personality of the Tamer who raises it.',
		form: 0,
		attribute: 0,
		family: 1,
		element: 7,
		baseStats: {
			hp: 62,
			mp: 78,
			attack: 40,
			defense: 30,
			speed: 39
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: ['Lunamon']
		},
		moves: [0, 'Black Blast', 'Rainbow Spit', 'Frothy Spit'],
		traits: ['Dark Breath 1']
	},

	{
		did: 24,
		species: 'Monodramon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/3/3d/Monodramon_vg.gif',
		description: 'Though small in size, this Digimon likes to fight Its favorite phrase is "Do you want a piece of me?" It is a purple Dragon Digimon that fiercely battles its enemies with its fatal blow.',
		form: 1,
		attribute: 2,
		family: 0,
		element: 0,
		baseStats: {
			hp: 103,
			mp: 106,
			attack: 72,
			defense: 57,
			speed: 69
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 12600
				},
				level: 15
			},
			from: ['Hopmon'],
			to: ['Devidramon', 'Dinohumon', 'Airdramon']
		},
		moves: [
			'Air Gun',
			'Gatling Punch',
			'Small Tornado',
			'Dramon Claw',
			'Headbutt'
		],
		traits: ['Speed 2', 'Sylph Aegis 2']
	},
	{
		did: 25,
		species: 'Agumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/16/Agumon_vg.gif',
		description: 'A reptilian Digimon which can walk with two legs With hard claws growing from its toes and fingers and "Pepper Breath" blown from its mouth, it stands up against any enemy.',
		form: 1,
		attribute: 2,
		family: 0,
		element: 0,
		baseStats: {
			hp: 111,
			mp: 115,
			attack: 83,
			defense: 62,
			speed: 57
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 12600
				},
				level: 15
			},
			from: [2],
			to: ['Greymon', 'Tyranomon', 'Airdramon']
		},
		moves: [
			'Pepper Breath',
			'Small Breath',
			'Mega Napalm',
			'Claw Attack',
			'Raging Flame'
		],
		traits: ['Powerful 2', 'Fire Aura 2']
	},
	{
		did: 26,
		species: 'Veemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/ec/Veemon_vg.gif',
		description: "The Digimon is a descendent of a species which flourished at the time of the Digimon World's creation It holds the power to armor digivolve by using a DigiEgg It's an energetic Dragon Digimon with a pure heart.",
		form: 1,
		attribute: 2,
		family: 0,
		element: 0,
		baseStats: {
			hp: 116,
			mp: 104,
			attack: 81,
			defense: 63,
			speed: 60
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 12600
				},
				level: 15
			},
			from: ['Demiveemon'],
			to: [
				'ExVeemon',
				'Veedramon',
				'Paildramon',
				'Dinobeemon',
				'Magnamon',
				'Flamedramon',
				'Gargomon'
			]
		},
		moves: [
			'Middle Attack',
			'Headbutt',
			'Gatling Punch',
			'Light Tackle',
			'Air Cutter'
		],
		traits: ['Protect 2', 'Quick 1']
	},
	{
		did: 27,
		species: 'Guilmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/26/Guilmon_vg.gif',
		description: 'A Rookie Digimon from the Dragon species that has potential of becoming a warrior The "digital hazard" on its stomach, is placed on those who could damage computer data It can also become a powerful tool to protect the world if used for peace.',
		form: 1,
		attribute: 1,
		family: 0,
		element: 0,
		baseStats: {
			hp: 120,
			mp: 101,
			attack: 87,
			defense: 67,
			speed: 50
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 12600
				},
				level: 15
			},
			from: [14],
			to: ['Growlmon']
		},
		moves: [
			'Middle Attack',
			'Fire Ball',
			'Sharp Claw',
			'Mega Napalm',
			'Dramon Claw'
		],
		traits: ['Fire Aura 2', 'EX Damage 1']
	},
	{
		did: 28,
		species: 'Dorumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/3/3f/Dorumon_vg.gif',
		description: 'The old-type "interface" on its forehead leads some to believe it is a prototype dating from before Digimon were discovered It has strong fighting instincts and bites anything, and then familiarized itself to it It has potential to be a great Digimon.',
		form: 1,
		attribute: 3,
		family: 2,
		element: 5,
		baseStats: {
			hp: 127,
			mp: 115,
			attack: 79,
			defense: 68,
			speed: 52
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 12600
				},
				level: 15
			},
			from: [12],
			to: ['Dorugamon', 'Reptiledramon']
		},
		moves: [
			'Light Tackle',
			'Tiny Metal',
			'Raging Beast',
			'Beast Coat',
			'Beast Attack'
		],
		traits: ['Earth Mother 2', 'Lucky Medal 1']
	},
	{
		did: 29,
		species: 'Betamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/e5/Betamon_vg.gif',
		description: 'An amphibian Digimon that walks on four legs Although it is generally quiet and tame, when angered it will shock its enemies with electrical energy.',
		form: 1,
		attribute: 1,
		family: 4,
		element: 2,
		baseStats: {
			hp: 85,
			mp: 121,
			attack: 76,
			defense: 66,
			speed: 53
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: ['Bukamon'],
			to: ['Seadramon', 'Whamon(Champion)', 'Gekomon']
		},
		moves: [
			'Light Tackle',
			'Tiny Blaster',
			'Thunder',
			'Acid Rain',
			'Water Shot'
		],
		traits: ['Mist Cape 2', 'Thunder Sign 1']
	},
	{
		did: 30,
		species: 'Gabumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/ec/Gabumon_vg.gif',
		description: "This Digimon makes a coat using collected data left by a Garurumon in order to protect itself It's shy by nature, but wearing the coat changes its personality and makes it become bold and tough.",
		form: 1,
		attribute: 2,
		family: 4,
		element: 2,
		baseStats: {
			hp: 113,
			mp: 102,
			attack: 86,
			defense: 59,
			speed: 63
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 12600
				},
				level: 15
			},
			from: [3],
			to: ['Garurumon', 'Gururumon', 'Garurumon(Black)']
		},
		moves: [
			'Claw Attack',
			'Small Cutter',
			'Small Breath',
			'Sharp Claw',
			'Beast Attack'
		],
		traits: ['Earth Mother 2', 'Quick 1']
	},
	{
		did: 31,
		species: 'Patamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/9a/Patamon_vg.gif',
		description: 'A mammal Digimon with peculiar big ears like wings. It can fly but it is faster for it to walk It can "Armor Digivolve" by using a DigiEgg.',
		form: 1,
		attribute: 1,
		family: 3,
		element: 9,
		baseStats: {
			hp: 96,
			mp: 120,
			attack: 69,
			defense: 56,
			speed: 76
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: [5],
			to: ['Angemon', 'Devimon', 'Pipismon', 'Ponchomon', 'Prairiemon']
		},
		moves: [
			'Light Tackle',
			'Air Gun',
			'Small Tornado',
			'Healing Air',
			'Boom Bubble'
		],
		traits: ['Sylph Aegis 2', 'Sleep Ward 1']
	},
	{
		did: 32,
		species: 'Biyomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/8/8c/Biyomon_vg.gif',
		description: "This chick-like Digimon's wings have developed into arms It usually lives on land and flies to escape danger, but it is no better than the Patamon Its dream is to fly in the big sky.",
		form: 1,
		attribute: 1,
		family: 3,
		element: 9,
		baseStats: {
			hp: 99,
			mp: 113,
			attack: 71,
			defense: 53,
			speed: 73
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: ['Yokomon'],
			to: ['Birdramon', 'Karatenmon', 'Kokatorimon']
		},
		moves: [
			'Light Tackle',
			'Small Breath',
			'Wind Claw',
			'Surprise Blow',
			'Beak Attack'
		],
		traits: ['Hard Rock 1', 'Speed 2']
	},
	{
		did: 33,
		species: 'Palmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/a/a0/Palmon_vg.gif',
		description: "A Digimon with a tropical flower growing out of its head It's said that this flower changes its fragrance according to its mood In a good mood, it emits a sweet smell, but when angry, it emits and odor that causes even larger Digimon to flee.",
		form: 1,
		attribute: 3,
		family: 8,
		element: 3,
		baseStats: {
			hp: 103,
			mp: 114,
			attack: 74,
			defense: 57,
			speed: 61
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: [6],
			to: ['Togemon', 'Woodmon']
		},
		moves: [
			'Small Cutter',
			'Electric Rage',
			'Unexpected Blow',
			'Stun Whipping',
			'Poison Ivy'
		],
		traits: ['Psychic 2', 'Numb Ward 1']
	},
	{
		did: 34,
		species: 'Gotsumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/20/Gotsumon_vg.gif',
		description: 'An attack Digimon which strengths its defense by wearing mineral data The data varies, depending on the location and conditions of where it emerged',
		form: 1,
		attribute: 3,
		family: 5,
		element: 5,
		baseStats: {
			hp: 131,
			mp: 116,
			attack: 81,
			defense: 80,
			speed: 48
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: [8],
			to: ['Icemon', 'Minotaurumon']
		},
		moves: [
			'Light Tackle',
			'Soulful Kick',
			'Raging Machine',
			'Great Wall',
			'Angry Rock'
		],
		traits: ['Psychic 2', 'Ether Eddy 2']
	},
	{
		did: 35,
		species: 'Tentomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/97/Tentomon_vg.gif',
		description: 'A primitive form of the Insect Digimon It loves nature and takes it easy at home. Usually the Insect type Digimon are aggressive, but this one is soft-centered It bears a hard carapace and claws.',
		form: 1,
		attribute: 1,
		family: 8,
		element: 3,
		baseStats: {
			hp: 106,
			mp: 108,
			attack: 75,
			defense: 71,
			speed: 63
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: ['Motimon'],
			to: ['Kabuterimon']
		},
		moves: [
			'Claw Attack',
			'Tiny Blaster',
			'Thunder Claw',
			'Electric Shock',
			'Super Shocker'
		],
		traits: ['Money Saver 1', 'Protect 2']
	},
	{
		did: 36,
		species: 'Otamamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/22/Otamamon_vg.gif',
		description: "This Digimon swims by using its large tail like a screw and lives under the water Since it spends more of its time in the water, its skin hasn't completely hardened up yet It sometimes goes up on a rock and does voice exercises.",
		form: 1,
		attribute: 1,
		family: 4,
		element: 2,
		baseStats: {
			hp: 106,
			mp: 108,
			attack: 75,
			defense: 71,
			speed: 63
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: ['Bukamon'],
			to: ['Gekomon']
		},
		moves: [
			'Claw Attack',
			'Frothier Spit',
			'Healing Spring',
			'Lullaby Bubble',
			'Water Shot'
		],
		traits: ['Sleep Ward 1', 'Mist Cape 2']
	},
	{
		did: 37,
		species: 'Gomamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/11/Gomamon_vg.gif',
		description: "A Digimon which has become capable of living on the land. It's covered with warm fur The fur gets longer as it grows up, and its color changes from white to brown.",
		form: 1,
		attribute: 1,
		family: 4,
		element: 2,
		baseStats: {
			hp: 108,
			mp: 112,
			attack: 74,
			defense: 66,
			speed: 56
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: ['Bukamon'],
			to: ['Ikkakumon', 'Mojyamon']
		},
		moves: [
			'Claw Attack',
			'Hydro Water',
			'Ice Blast',
			'Double Wave',
			'Water Shot'
		],
		traits: ['Psychic 2', 'Mist Cape 2']
	},
	{
		did: 38,
		species: 'Tapirmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/6e/Tapirmon_vg.gif',
		description: 'This rare, tapir-like Digimon is believed to eat dreams It was born from a computer that was specially designed for examining brain waves.',
		form: 1,
		attribute: 1,
		family: 6,
		element: 6,
		baseStats: {
			hp: 122,
			mp: 128,
			attack: 78,
			defense: 75,
			speed: 58
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 12600
				},
				level: 15
			},
			from: ['DemiMeramon'],
			to: ['Apemon', 'Meramon', 'DarkLizardmon']
		},
		moves: [
			'Light Tackle',
			'Holy Bolt',
			'Nightmare',
			'Purification',
			'Holy Shoot'
		],
		traits: ['Psychic 2', 'Collector 1']
	},
	{
		did: 39,
		species: 'DemiDevimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/7/76/DemiDevimon_vg.gif',
		description: "A small Digimon which looks like a bat They say that it's the one that tempted and seduced Devimon into the path of evil It isn't the type of Digimon which would fight at the forefront, but it's crafty and does bad things everywhere.",
		form: 1,
		attribute: 1,
		family: 1,
		element: 7,
		baseStats: {
			hp: 100,
			mp: 118,
			attack: 75,
			defense: 67,
			speed: 64
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: [7],
			to: ['Devimon', 'Vilemon', 'Bakemon']
		},
		moves: [
			'Light Tackle',
			'Shadow Claw',
			'Raging Darkness',
			'Dark Whisper',
			'Demi Dart'
		],
		traits: ['Speed 2', 'Dark Breath 2']
	},
	{
		did: 40,
		species: 'ToyAgumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/4/42/ToyAgumon_vg.gif',
		description: 'A Digimon said to be created by a child playing on the Internet, trying to mimic Agumon It is cowardly, but has a keen sense of justice It loves communicating with children on the internet It falls apart into pieces when startled.',
		form: 1,
		attribute: 2,
		family: 5,
		element: 10,
		baseStats: {
			hp: 113,
			mp: 120,
			attack: 73,
			defense: 71,
			speed: 55
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['Mekanorimon', 'Guardromon']
		},
		moves: [
			'Light Tackle',
			'Energy Bolt',
			'Tiny Bomb',
			'Boost Tackle',
			'Machine Attack'
		],
		traits: ['Protect 2', 'Flee 1']
	},
	{
		did: 41,
		species: 'Hagurumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/24/Hagurumon_vg.gif',
		description: 'A Digimon in the shape of a gear.\nIts body is full of gears and the Digimon will stop functioning if even one gets stuck.\nIt can manipulate others by sneding them a computer virus.',
		form: 1,
		attribute: 1,
		family: 5,
		element: 10,
		baseStats: {
			hp: 115,
			mp: 115,
			attack: 80,
			defense: 70,
			speed: 52
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: [8],
			to: ['Mekanorimon', 'Guardromon']
		},
		moves: [
			' Energy Bolt',
			'Dark Crusher',
			'Boost Tackle',
			'Nano Break',
			'Machine Attack'
		],
		traits: ['Ether Eddy 2', 'Collector 1']
	},
	{
		did: 42,
		species: 'Salamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/24/Salamon_vg.gif',
		description: "An experimental Digimon created by a Digimon researcher.\nAlthough it's a divine Digimon, it hasn't yet realized its mission, so could turn either good or evil.",
		form: 1,
		attribute: 2,
		family: 6,
		element: 6,
		baseStats: {
			hp: 105,
			mp: 119,
			attack: 76,
			defense: 59,
			speed: 61
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 12600
				},
				level: 15
			},
			from: ['Nyaromon'],
			to: ['Gatomon', 'Mikemon', 'BlackGatomon']
		},
		moves: [
			'Light Tackle',
			'Gatling Punch',
			'Sonic Voice',
			'Holy Hand',
			'Holy Shoot'
		],
		traits: ['Halo 2', 'Death Ward 1']
	},
	{
		did: 43,
		species: 'Wormmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/22/Wormmon_vg.gif',
		description: 'A timid but kind-hearted larval Digimon.\nIt can\'t match with big-size Digimon, but once it "Armor Digivolves" with a DigiEgg, it can obtain tremendous power.',
		form: 1,
		attribute: 1,
		family: 8,
		element: 3,
		baseStats: {
			hp: 116,
			mp: 123,
			attack: 72,
			defense: 73,
			speed: 51
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: [18],
			to: [
				'Stingmon',
				'Shadramon',
				'Paildramon',
				'Kongoumon',
				'Aurumon',
				'Dinobeemon'
			]
		},
		moves: [
			'Light Tackle',
			'Surprise Blow',
			'Shock Net',
			'Gaia Healing',
			'Petite Tackle'
		],
		traits: ['Thunder Sign 2', 'Lucky Medal 1']
	},
	{
		did: 44,
		species: 'Hawkmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/7/7a/Hawkmon_vg.gif',
		description: 'A descendant of an ancient species which can "Armor Digivolve" borrowing the power of the DigiEgg.\nIt\'s a Bird Digimon that is always polite and has proper manners.',
		form: 1,
		attribute: 0,
		family: 3,
		element: 9,
		baseStats: {
			hp: 103,
			mp: 117,
			attack: 77,
			defense: 60,
			speed: 64
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: ['Poromon'],
			to: ['Toucanmon', 'Shurimon', 'Allomon']
		},
		moves: [
			'Small Cutter',
			'Wind Claw',
			'Small Tornado',
			'Air Cutter',
			'Beak Attack'
		],
		traits: ['Powerfull 2', 'Speed 2']
	},
	{
		did: 45,
		species: 'Armadillomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/c/ce/Armadillomon_vg.gif',
		description: 'A hard carapace protects this mammal Digimon\'s body.\nIt\'s a descendant of an ancient species and able to "Armor Digivolve" using a DigiEgg.',
		form: 1,
		attribute: 0,
		family: 2,
		element: 5,
		baseStats: {
			hp: 124,
			mp: 105,
			attack: 81,
			defense: 70,
			speed: 53
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: ['Upamon'],
			to: ['Kenkimon', 'Seahomon', 'Ankylomon', 'Shakkoumon']
		},
		moves: [
			'Light Tackle',
			'Claw Attack',
			'Sharp Claw',
			'Middle Tackle',
			'Beast Attack'
		],
		traits: ['Protect 2', 'Mother Earth 2']
	},
	{
		did: 46,
		species: 'Terriermon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/22/Terriermon_vg.gif',
		description: 'One of the twin Digimon with a horn on its head.\nIts cheery personality isn\'t very "warrior-like," but once the battle starts, it shows its tremendous power.',
		form: 1,
		attribute: 2,
		family: 2,
		element: 5,
		baseStats: {
			hp: 121,
			mp: 122,
			attack: 81,
			defense: 70,
			speed: 59
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: [15],
			to: ['Gargomon']
		},
		moves: [
			'Light Tackle',
			'Small Breath',
			'Gatling Punch',
			'Raging Beast',
			'Tiny Twister'
		],
		traits: ['Quick 1', 'EX Demage 1']
	},

	{
		did: 47,
		species: 'Lopmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/b/b9/Lopmon_vg.gif',
		description: "One of the twin Digimon with three horns on its head.\nIt's a crybaby and needy.\nIts personality is the opposite of Terriermon's.\nHowever, when it comes down to crunch time, it displays its hidden power just as well as Terriermon.",
		form: 1,
		attribute: 3,
		family: 2,
		element: 7,
		baseStats: {
			hp: 120,
			mp: 125,
			attack: 79,
			defense: 66,
			speed: 61
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: [16],
			to: ['Wendigomon']
		},
		moves: [
			'Light Tackle',
			'Gatling Punch',
			'Little Blizzard',
			'Raging Darkness',
			'Dark Twister'
		],
		traits: ['Critical 1', 'Sniper 1']
	},

	{
		did: 48,
		species: 'Renamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/5/54/Renamon_vg.gif',
		description: 'The relationship with a trainer greatly affects the growth of this Digimon.\nTaking good care of it from an In-training level will make it a smart Renamon.\nIt relies on its speed rather than power in battle.',
		form: 1,
		attribute: 3,
		family: 6,
		element: 6,
		baseStats: {
			hp: 113,
			mp: 116,
			attack: 71,
			defense: 62,
			speed: 68
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 12600
				},
				level: 15
			},
			from: ['Viximon'],
			to: ['Kyubimon']
		},
		moves: [
			'Claw Attack',
			'Small Tornado',
			'Grand Cross',
			'Light Coat',
			'Leaf Blade'
		],
		traits: ['Speed 2', 'Quick 1']
	},

	{
		did: 49,
		species: 'Impmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/23/Impmon_vg.gif',
		description: "A mischievous Digimon which looks like an imp.\nIt's very proud and competitive, and never fawns upon or yields to the stronger ones.\nBut, it actually can't stand being alone.",
		form: 1,
		attribute: 3,
		family: 1,
		element: 7,
		baseStats: {
			hp: 118,
			mp: 115,
			attack: 83,
			defense: 63,
			speed: 58
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: ['Yaamon'],
			to: ['Devimon', 'IceDevimon']
		},
		moves: [
			'Light Tackle',
			'Small Breath',
			'Little Blizzard',
			'Ice Blast',
			'Dark Fire'
		],
		traits: ['Dark Breath 2', 'Psychic 2']
	},

	{
		did: 50,
		species: 'Keramon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/0/0c/Keramon_vg.gif',
		description: 'A digivolved version of Tsumemon.\nCan eat over 100MB of data per second.\nAs soon as Keramon enters a computer, all data will corrupt.\nIt thinks destroying data is a game.',
		form: 1,
		attribute: 3,
		family: 9,
		element: 7,
		baseStats: {
			hp: 114,
			mp: 113,
			attack: 78,
			defense: 72,
			speed: 60
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: [17],
			to: ['Kurisarimon']
		},
		moves: [
			'Dark Crusher',
			'Shadow Claw',
			'Tiny Bomb',
			'Dark Claw',
			'Crazy Giggle'
		],
		traits: ['Dark Breath 2', 'Numb Ward 1']
	},

	{
		did: 51,
		species: 'Falcomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/9e/Falcomon_vg.gif',
		description: 'A ninja-style Bird Digimon. It has good control of its wings and moves around the enemy quickly like a monkey.',
		form: 1,
		attribute: 2,
		family: 3,
		element: 9,
		baseStats: {
			hp: 109,
			mp: 114,
			attack: 72,
			defense: 63,
			speed: 71
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['Peckmon']
		},
		moves: [
			'Small Cutter',
			'Wind Claw',
			'Tiny Bomb',
			'Metal Star',
			'Beak Attack'
		],
		traits: ['Speed 2', 'Sniper 1']
	},

	{
		did: 52,
		species: 'Penguinmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/3/36/Penguinmon_vg.gif',
		description: 'A Bird Digimon discovered on a computer at the South Pole station.\nIts wings have degenerated and it walks slowly.\nIt can use its tiny wings to steer while swimming underwater.',
		form: 1,
		attribute: 2,
		family: 4,
		element: 9,
		baseStats: {
			hp: 107,
			mp: 121,
			attack: 74,
			defense: 64,
			speed: 70
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['Dolphmon']
		},
		moves: [
			'Small Cutter',
			'Wind Claw',
			'Tiny Bomb',
			'Metal Star',
			'Beak Attack'
		],
		traits: ['Sylph Aegis 2', 'Mist Cape 2']
	},

	{
		did: 53,
		species: 'Goburimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/e2/Goburimon_vg.gif',
		description: 'This Digimon loves bad things. It is quite crafty and will never stand up against a strong opponent.\nIt never lets a day go by without grooming its mohawk. Its lethal technique is called "Goblin Strike."',
		form: 1,
		attribute: 1,
		family: 1,
		element: 7,
		baseStats: {
			hp: 118,
			mp: 118,
			attack: 82,
			defense: 72,
			speed: 50
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: [7],
			to: ['Fugamon', 'Ogremon']
		},
		moves: [
			'Light Tackle',
			'Gatling Punch',
			'Tiny Bomb',
			'Raging Beast',
			'Goburi Strike'
		],
		traits: ['Money Saver 1', 'Powerfull 2']
	},

	{
		did: 54,
		species: 'Kumamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/eb/Kumamon_vg.gif',
		description: 'A Digimon that looks like a bear cub.\nIts battle capability is hidden by its small body and should not be taken lightly.\nIt always wears a cap backwards.',
		form: 1,
		attribute: 1,
		family: 2,
		element: 5,
		baseStats: {
			hp: 113,
			mp: 100,
			attack: 76,
			defense: 68,
			speed: 70
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 12600
				},
				level: 15
			},
			from: ['Zurumon'],
			to: ['LoaderLiomon', 'Grizzlymon']
		},
		moves: [
			'Light Tackle',
			'Claw Attack',
			'Gatling Punch',
			'Pummel Whack',
			'Beast Attack'
		],
		traits: ['Hardrock 1', 'Critical 1']
	},

	{
		did: 55,
		species: 'Kotemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/18/Kotemon_vg.gif',
		description: "A Digimon that practices kendo with a bamboo sword.\nAlthought it doesn't say much, this Digimon works hard in the background.\nIt never removes its armor, and no one has ever seen its true face.",
		form: 1,
		attribute: 3,
		family: 5,
		element: 10,
		baseStats: {
			hp: 122,
			mp: 125,
			attack: 84,
			defense: 69,
			speed: 58
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 12600
				},
				level: 15
			},
			from: [8],
			to: ['Dinohumon', 'Gladimon', 'Musyamon']
		},
		moves: [
			'Small Cutter',
			'Mini Blade',
			'Normal Blade',
			'Air Cutter',
			'Lightning Arrow'
		],
		traits: ['Death Ward 1', 'Critical 1']
	},

	{
		did: 56,
		species: 'Shamamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/f/f0/Shamamon_vg.gif',
		description: 'A Digimon whose purpose is to convey the will of the gods.\nIt performs a strange dance during the ritual.\nIts expertise is hitting enemies with a big stone during the battle.',
		form: 1,
		attribute: 1,
		family: 1,
		element: 7,
		baseStats: {
			hp: 117,
			mp: 132,
			attack: 75,
			defense: 60,
			speed: 59
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: [7],
			to: ['Apemon']
		},
		moves: [
			'Small Tornado',
			'Thunder',
			'Beast Coat',
			'Cure Poison',
			'Goburi Strike'
		],
		traits: ['Psychic 2', 'Antidote 1']
	},

	{
		did: 57,
		species: 'SnowGoburimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/9c/SnowGoburimon_vg.gif',
		description: "A Digimon of the distinct Goburimon species.\nThough being raised in snow country, it's always energetic because it wears warm clothes.\nIts personality is exactly the same as Goburimon.",
		form: 1,
		attribute: 1,
		family: 4,
		element: 1,
		baseStats: {
			hp: 111,
			mp: 119,
			attack: 79,
			defense: 62,
			speed: 61
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: [7],
			to: ['Hyogamon']
		},
		moves: [
			'Little Blizzard',
			'Ice Blast',
			'Sharp Claw',
			'Raging Water',
			'Snow Claw'
		],
		traits: ['Mist Cape 2', 'Collector 1']
	},

	{
		did: 58,
		species: 'Syakomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/b/b8/Syakomon_vg.gif',
		description: 'This Digimon is protected by a pair of shells. It is crafty enough to lure the enemy with its cute look and then attack.\nThe shells are very hard and are as study as a rock against normal attacks. Its body inside the shells is slimy.',
		form: 1,
		attribute: 1,
		family: 4,
		element: 2,
		baseStats: {
			hp: 124,
			mp: 120,
			attack: 67,
			defense: 72,
			speed: 47
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: ['Bukamon'],
			to: ['Gesomon', 'Octomon', 'Seadramon']
		},
		moves: [
			'Hydro Water',
			'Tiny Metal',
			'Hard Shell',
			'Water Coat',
			'Water Shot'
		],
		traits: ['Protect 2', 'Money Saver 1']
	},

	{
		did: 59,
		species: 'SnowAgumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/2/2f/SnowAgumon_vg.gif',
		description: 'A Digimon of the distinct Agumon species which lives in cold places.\nIt loves to spend time in the cold, and its body color blends into the environment in order to protect itself.',
		form: 1,
		attribute: 2,
		family: 0,
		element: 1,
		baseStats: {
			hp: 98,
			mp: 121,
			attack: 76,
			defense: 66,
			speed: 54
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: ['Bukamon'],
			to: ['Mojyamon', 'Seadramon']
		},
		moves: [
			'Claw Attack',
			'Little Blizzard',
			'Ice Blast',
			'Freeze Bolt',
			'Snow Claw'
		],
		traits: ['Psychic 2', 'Flee 1']
	},

	{
		did: 60,
		species: 'BlackAgumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/98/BlackAgumon_vg.gif',
		description: "An Agumon whose wild instincts have been awakened due to the digivolution to a virus kind.\nIt's not only fearless, but rather ferocious. Its black body in unique.",
		form: 1,
		attribute: 1,
		family: 0,
		element: 0,
		baseStats: {
			hp: 110,
			mp: 112,
			attack: 84,
			defense: 60,
			speed: 52
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['BlackGreymon', 'Tyrannomon', 'DarkTyrannomon']
		},
		moves: [
			'Claw Attack',
			'Small Breath',
			'Sharp Claw',
			'Dramon Claw',
			'Pepper Breath'
		],
		traits: ['Powerful 2', 'Dark Breath 2']
	},

	{
		did: 61,
		species: 'Muchomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/a/a3/Muchomon_vg.gif',
		description: 'A Digimon from the warmer south that resembles Penguinmon.\nIt lives happily and has very colorful tropical fur.',
		form: 1,
		attribute: 3,
		family: 3,
		element: 9,
		baseStats: {
			hp: 95,
			mp: 116,
			attack: 70,
			defense: 54,
			speed: 71
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: ['Yokomon'],
			to: ['Birdramon', 'Kokatorimon']
		},
		moves: [
			'Light Tackle',
			'Small Breath',
			'Wind Claw',
			'Raging Wind',
			'Beak Attack'
		],
		traits: ['Sylph Aegis 2', 'Lucky Medal 1']
	},

	{
		did: 62,
		species: 'Crabmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/90/Crabmon_vg.gif',
		description: 'A crab-looking Digimon which improves its battle efficiency by wearing metal data melted in the "Net Ocean."\nIt\'s got big claws and a hard carapace. Its weak points are it\'s stomach and joints.',
		form: 1,
		attribute: 3,
		family: 4,
		element: 2,
		baseStats: {
			hp: 120,
			mp: 117,
			attack: 82,
			defense: 75,
			speed: 53
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: ['Bukamon'],
			to: ['Shellmon', 'MoriShellmon', 'Coelamon']
		},
		moves: [
			'Small Cutter',
			'Frothier Spit',
			'Hard Shell',
			'Cross Cutter',
			'Water Shot'
		],
		traits: ['Protect 2', 'Critical 1']
	},

	{
		did: 63,
		species: 'Floramon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/d/d8/Floramon_vg.gif',
		description: "A Digimon whose whole face is a flower shape.\nNormally it uses its petal-like shells as a helmet to protect it's head, but when in a good mood, it opens up its petals like a flower.",
		form: 1,
		attribute: 3,
		family: 8,
		element: 3,
		baseStats: {
			hp: 103,
			mp: 132,
			attack: 64,
			defense: 50,
			speed: 67
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: ['Yokomon'],
			to: ['RedVegiemon', 'Ninjamon', 'Kiwimon']
		},
		moves: [
			'Tiny Blaster',
			'Rain of Pollen',
			'Stun Whipping',
			'Gaia Healing',
			'Poison Ivy'
		],
		traits: ['Lucky Medal 1', 'Antidote 1']
	},

	{
		did: 64,
		species: 'Gizamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/a/af/Gizamon_vg.gif',
		description: "A Digimon with flippers on both feet and hands. It's more suited to live under the water and is better at swimming than walking.\nFor that reason, it's cowardly on land, but fierce in the water.",
		form: 1,
		attribute: 1,
		family: 4,
		element: 2,
		baseStats: {
			hp: 115,
			mp: 115,
			attack: 80,
			defense: 70,
			speed: 55
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: [7],
			to: ['Datamon']
		},
		moves: [
			'Light Tackle',
			'mini Blade',
			'Frothier Spit',
			'Normal Blade',
			'Water Shot'
		],
		traits: ['Death Ward 1', 'EX Demage 1']
	},

	{
		did: 65,
		species: 'Lalamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/98/Lalamon_vg.gif',
		description: 'A plant-like Digimon which looks like a flower bud. It flies by turning the leaves on its head.\nIts face is emotionless, but pretty loveable.\nIts personality is very kind and always thinking about allies.',
		form: 1,
		attribute: 3,
		family: 8,
		element: 3,
		baseStats: {
			hp: 93,
			mp: 129,
			attack: 60,
			defense: 55,
			speed: 68
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: [20],
			to: ['Sunflowmon']
		},
		moves: [
			'Tiny Bomb',
			'Surprise Blow',
			'Lullaby',
			'Gaia Healing',
			'Petite Tackle'
		],
		traits: ['Psychic 2', 'Money Saver 1']
	},

	{
		did: 66,
		species: 'Aruraumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/d/da/Aruraumon_vg.gif',
		description: "A Plant Digimon that looks like Palmon. The color of the flower blossoming on its head is purple, which differs from Palmon.\nThe odor released from the flower on its head is as stinky as Palmon's.",
		form: 1,
		attribute: 1,
		family: 8,
		element: 3,
		baseStats: {
			hp: 108,
			mp: 142,
			attack: 73,
			defense: 63,
			speed: 61
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: [6],
			to: ['Togemon', 'Vegiemon', 'Woodmon', 'Weedmon']
		},
		moves: [
			'Shadow Claw',
			'Thunder Claw',
			'Rain of Pollen',
			'Poison Powder',
			'Poison Ivy'
		],
		traits: ['Dark Breath 2', 'Critical 1']
	},

	{
		did: 67,
		species: 'ToyAgumon(Black)',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/5/5f/ToyAgumon_%28Black%29_vg.gif',
		description: "A cynical, virus-infested Toy Agumon that loves to do mischievous pranks.\nThe blocks on its body are very durable, but just like ToyAgumon, it will fall to pieces if it's surprised.",
		form: 1,
		attribute: 1,
		family: 5,
		element: 10,
		baseStats: {
			hp: 112,
			mp: 125,
			attack: 71,
			defense: 68,
			speed: 57
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['BomberNanimon', 'Guardromon']
		},
		moves: [
			'Light Tackle',
			'Energy Bolt',
			'Tiny Medal',
			'Tiny Bomb',
			'Machine Attack'
		],
		traits: ['Ether Eddy 2', 'Flee 1']
	},

	{
		did: 68,
		species: 'Tsukaimon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/6b/Tsukaimon_vg.gif',
		description: "This Digimon looks exactly like Patamon, but its personality is pretty sinuous.\nIt's an errand Digimon from Devimon and others. It's short-tempered and feisty. It always wants to sort things out with battle.",
		form: 1,
		attribute: 1,
		family: 1,
		element: 7,
		baseStats: {
			hp: 101,
			mp: 125,
			attack: 71,
			defense: 58,
			speed: 75
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: [5],
			to: ['Devimon', 'Devidramon', 'Witchmon']
		},
		moves: [
			'Light Tackle',
			'Raging Darkness',
			'Black Coat',
			'Black Blast',
			'Dark Twister'
		],
		traits: ['Speed 2', 'Flee 1']
	},

	{
		did: 69,
		species: 'Pawnchessmon (Black)',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/9/94/PawnChessmon_%28Black%29_vg.gif',
		description: "A puppet Digimon which was created from data flown out of a computer's chess game.\nIts power is still weak, but holds the potential to possess the ultimate-class power.\nIt shares a rivalry with a general food [sic] soldier, PawnChessmon White.",
		form: 1,
		attribute: 1,
		family: 5,
		element: 10,
		baseStats: {
			hp: 119,
			mp: 120,
			attack: 81,
			defense: 75,
			speed: 53
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['KnightChessmon (Black)']
		},
		moves: [
			'Light Tackle',
			'Energy Bolt',
			'Mini Blade',
			'Boost On',
			'Bone Spear'
		],
		traits: ['Ether Eddy 2', 'Protect 2']
	},

	{
		did: 70,
		species: 'Gaomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/6d/Gaomon_vg.gif',
		description: 'A Beast Digimon with sharp claws. Until its claws grow in, it uses boxing gloves to protect them.\nIt moves quickly and is especially skilled at a "hit and run" style of fighting.',
		form: 1,
		attribute: 1,
		family: 2,
		element: 5,
		baseStats: {
			hp: 108,
			mp: 117,
			attack: 83,
			defense: 59,
			speed: 70
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 12600
				},
				level: 15
			},
			from: [19],
			to: ['Gaogamon']
		},
		moves: [
			'Gatling Punch',
			'Small Tornado',
			'Pummel Whack',
			'Sonic Counter',
			'Beast Attack'
		],
		traits: ['Critical 1', 'Speed 2']
	},

	{
		did: 71,
		species: 'DotFalcomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/13/Dfalcomon_vg.gif',
		description: 'A special Falcomon which emerged from a keychain game.\nIt must be a subspecies of Falcomon, but its potential is unknown.',
		form: 1,
		attribute: 1,
		family: 3,
		element: 9,
		baseStats: {
			hp: 130,
			mp: 125,
			attack: 82,
			defense: 67,
			speed: 80
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'bird',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: []
		},
		moves: [
			'Rainbow Force',
			'Wind Claw',
			'Gashing Breeze',
			'Crescent Cutter',
			'Boom Bubble'
		],
		traits: ['Speed 2', 'Lucky Gods']
	},

	{
		did: 72,
		species: 'Kudamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/b/bc/Kudamon_vg.gif',
		description: 'A Digimon which coils around a Holy Cartridge and uses it as a weapon.\nIt is said to have stored Holy power in its left earring.\nThe more power it stores, the more effective the next digivolution will be.',
		form: 1,
		attribute: 3,
		family: 6,
		element: 6,
		baseStats: {
			hp: 112,
			mp: 116,
			attack: 79,
			defense: 69,
			speed: 72
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['Reppamon']
		},
		moves: [
			'Grand Cross',
			'Sharp Claw',
			'Flash Ray',
			'Mental Cure',
			'Holy Shoot'
		],
		traits: ['Snipe 1', 'EX Demage 1']
	},

	{
		did: 73,
		species: 'Kamemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/0/07/Kamemon_vg.gif',
		description: 'This Digimon looks like a turtle with a carapace which is similar to a computer mouse.\nIt can conceal its entire body in its armored hide, but its helmet remains exposed.',
		form: 1,
		attribute: 3,
		family: 4,
		element: 2,
		baseStats: {
			hp: 118,
			mp: 120,
			attack: 74,
			defense: 75,
			speed: 58
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: ['Bukamon'],
			to: ['Gwappamon']
		},
		moves: [
			'Middle Tackle',
			'Normal Missile',
			'Raging Water',
			'Hard Shell',
			'Water Shot'
		],
		traits: ['Protect 2', 'Collector 1']
	},

	{
		did: 74,
		species: 'Dracmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/18/Dracmon_vg.gif',
		description: 'A vampire Digimon that loves mischief. It forgets about sucking blood in order to succeed and takes on dangerous challenges without flinching.',
		form: 1,
		attribute: 1,
		family: 9,
		element: 7,
		baseStats: {
			hp: 109,
			mp: 124,
			attack: 79,
			defense: 62,
			speed: 74
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'aquatic',
					amount: 12600
				},
				level: 15
			},
			from: [7],
			to: ['Sangloupmon', 'Yasyamon']
		},
		moves: [
			'Dark Crusher',
			'Shadow Claw',
			'Sharp Claw',
			'Dark Savior',
			'Demi Dart'
		],
		traits: ['Dark Breath 2', 'Sleep Ward 1']
	},

	{
		did: 75,
		species: 'PawnChesson (White)',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/e/eb/PawnChessmon_%28White%29.gif',
		description: "A puppet Digimon which was created from data flown out of a computer's chess game.\nIts power is still weak, but holds the potential to possess the ultimate-class power.\nIt shares a rivalry with a general food [sic] soldier, Pawn Chessmon Black.",
		form: 1,
		attribute: 1,
		family: 5,
		element: 10,
		baseStats: {
			hp: 119,
			mp: 120,
			attack: 80,
			defense: 75,
			speed: 53
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['KnightChessmon (White)']
		},
		moves: [
			'Dark Crusher',
			'Shadow Claw',
			'Sharp Claw',
			'Dark Savior',
			'Demi Dart'
		],
		traits: ['Protect 2', 'Halo 2']
	},

	{
		did: 76,
		species: 'DotAgumon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/15/DotAgumon_vg.gif',
		description: 'A special Agumon which emerged from a keychain game.\nIt must be a subspecies of Agumon, but its potential is unknown.',
		form: 1,
		attribute: 1,
		family: 5,
		element: 5,
		baseStats: {
			hp: 135,
			mp: 132,
			attack: 82,
			defense: 73,
			speed: 66
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dragon',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['KnightChessmon (White)']
		},
		moves: [
			'Rainbow Force',
			'Dramon Claw',
			'Giga Breath',
			'Power Cutter',
			'Fire Ball'
		],
		traits: ['Powerfull 2', 'Economizer S']
	},

	{
		did: 77,
		species: 'Kunemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/62/Kunemon_vg.gif',
		description: 'A larval Digimon with lightning bolt markings on its body.\nThe lighning bolt on its face changes based on its emotions, so it is thought to be the eye.\nResearchers are interested in it as a subject for their research in insect digivolution.',
		form: 1,
		attribute: 1,
		family: 8,
		element: 3,
		baseStats: {
			hp: 99,
			mp: 127,
			attack: 75,
			defense: 68,
			speed: 52
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: [18],
			to: ['Flymon']
		},
		moves: [
			'Tiny Blaster',
			'Surprise Blow',
			'Electric Rage',
			'Shock Net',
			'Super Shocker'
		],
		traits: ['Numb Ward 1', 'Thunder Sign 2']
	},

	{
		did: 78,
		species: 'Mushroomon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/c/c2/Mushroomon_vg.gif',
		description: 'A Digimon which looks like a poisonous toadstool.\nSmall muschrooms have grown all over its body, and receiving attacks from it causes several symptoms.\nIt loves to bully weaker Digimon, but it is actually a very shy Digimon.',
		form: 1,
		attribute: 1,
		family: 8,
		element: 3,
		baseStats: {
			hp: 107,
			mp: 114,
			attack: 77,
			defense: 66,
			speed: 62
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['Woodmon']
		},
		moves: [
			'Tiny Bomb',
			'Surprise Blow',
			'Unexpected Blow',
			'Poison Powder',
			'Super Shocker'
		],
		traits: ['Powerfull 2', 'Antidote 1']
	},

	{
		did: 79,
		species: 'Solarmon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/1/18/Solarmon_vg.gif',
		description: "This Digimon looks like Hagurumon. It's a rare species of the Machine Digimon.\nThe heat released from its body is burning hot.",
		form: 1,
		attribute: 2,
		family: 5,
		element: 10,
		baseStats: {
			hp: 114,
			mp: 112,
			attack: 78,
			defense: 72,
			speed: 57
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: [],
			to: ['Clockmon', 'Guardromon', 'Meramon']
		},
		moves: [
			'Small Breath',
			'Energy Bolt',
			'Boost Tackle',
			'Medical System',
			'Machine Attack'
		],
		traits: ['Fire Aura 2', 'Lucky Medal 1']
	},

	{
		did: 80,
		species: 'Candlemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/0/08/Candlemon_vg.gif',
		description: "A candle-like Digimon. There is a falme on its head, and without the flame, it can't survive.\nFor that reason, some say that the main body is the flame part of the head, and the wax part is just a camouflage.",
		form: 1,
		attribute: 3,
		family: 7,
		element: 9,
		baseStats: {
			hp: 114,
			mp: 122,
			attack: 79,
			defense: 57,
			speed: 60
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: ['DemiMeramon'],
			to: ['Meramon', 'Wizardmon']
		},
		moves: [
			'Small Breath',
			'Raging Flame',
			'Black Coat',
			'Giga Breath',
			'Dark Fire'
		],
		traits: ['Fire Aura 2', 'Dark Breath 2']
	},

	{
		did: 81,
		species: 'KoKuwamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/64/Kokuwamon_vg.gif',
		description: "A Digimon which looks like a stag beetle. Its head and arms are like a taser gun.\nIt releases 1 million volts of electricity if feeling the danger. When it's hungry, it gives a charge of electricity.\nIt's normally gentle.",
		form: 1,
		attribute: 3,
		family: 3,
		element: 10,
		baseStats: {
			hp: 114,
			mp: 122,
			attack: 79,
			defense: 57,
			speed: 60
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'machine',
					amount: 12600
				},
				level: 15
			},
			from: ['Motimon'],
			to: ['Thunderballmon', 'Guardromon']
		},
		moves: [
			'Tiny Blaster',
			'Boost Tackle',
			'Double Blaster',
			'Electric Shock',
			'Lightning Arrow'
		],
		traits: ['Critical 1', 'Thunder Sign 2']
	},

	{
		did: 82,
		species: 'DoKunemon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/5/52/DoKunemon_vg.gif',
		description: "This larval Digimon, along with Kunemon has been a target of research to solve the mystery on the Insect Digimon.\nA great caution is necessary when it's handled because it's poisonous.",
		form: 1,
		attribute: 1,
		family: 8,
		element: 3,
		baseStats: {
			hp: 106,
			mp: 125,
			attack: 80,
			defense: 65,
			speed: 55
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'plant/insect',
					amount: 12600
				},
				level: 15
			},
			from: ['Motimon'],
			to: ['Dokugumon']
		},
		moves: [
			'Light Tackle',
			'Raging Darkness',
			'Black Blast',
			'Poison Powder',
			'Super Shocker'
		],
		traits: ['Antidote 1', 'Sniper 1']
	},

	{
		did: 83,
		species: 'Coronamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/6/67/Coronamon_vg.gif',
		description: "A Rookie Digimon that Digivolved from an In-Training Sunmon.\nIt's full of energy and has a great deal of curiosity.\nIt bears the power of flame and is good at punching the enemy with an energetic fist.",

		form: 1,
		attribute: 2,
		family: 6,
		element: 6,
		baseStats: {
			hp: 124,
			mp: 128,
			attack: 82,
			defense: 68,
			speed: 68
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'holy',
					amount: 12600
				},
				level: 15
			},
			from: [22],
			to: ['Firamon']
		},
		moves: [
			'Small Breath',
			'Holy Bolt',
			'Gatling Punch',
			'Grand Cross',
			'Holy Shoot'
		],
		traits: ['Fire Aura 2', 'Powerfull 2']
	},

	{
		did: 84,
		species: 'Lunamon',
		sprite: 'https://vignette.wikia.nocookie.net/digimon/images/5/55/Lunamon_vg.gif',
		description: "A Rookie Digimon that Digivolved from an In-Training Moonmon.\nIt's a little shy with strangers and bashful.\nIt holds the power of clear water.\nIt's cute in battle, but good at attacking and scratching with claws filled with the power of darkness.",
		form: 1,
		attribute: 2,
		family: 1,
		element: 7,
		baseStats: {
			hp: 106,
			mp: 136,
			attack: 74,
			defense: 65,
			speed: 75
		},
		evolution: {
			evoType: 0,
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'dark',
					amount: 12600
				},
				level: 15
			},
			from: [23],
			to: ['Lekismon']
		},
		moves: ['Hydro Water, Dark Crusher, Shadow Claw, Raging Water, Demi Dart'],
		traits: ['Quick 1', 'Speed 2']
	},
{
    did: 85,
    species: "Mekanorimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/2/2c/Mekanorimon_vg.gif",
    description: "A small-size Digimon can ride in this Digimon.\n It doesn't have a will of its own and needs someone to manipulate it.\n But, the rider's ability directly reflects on the Digimon, so it can't be underestimated.",
    form: 2,
    attribute: 1,
    family: 5,
    element: 10,
    baseStats: {
        hp: 165,
        mp: 179,
        attack: 103,
        defense: 96,
        speed: 74
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'machine',
                amount: 30250
            },
            level: 30
        },
        from: [40, 41],
        to: ["Guardromon", "Megadramon", "Gigadramon"]
    },
    moves: [0, "Energy Bolt", "Normal Blade", "Energy Shot", "Rising Ray", "Power Laser"],
    traits: ["Protect 3", "Collector 2"]
},{
    did: 86,
    species: "Greymon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/f/fb/Greymon_vg.gif",
    description: "A yellow, dragon-like Digimon. The skin on its head has hardened and become a hard shell with excellent protection.\n It has sharp claws and a huge horn with enormous attack power.\n It's smart and able to cooperate with others.",
    form: 2,
    attribute: 2,
    family: 0,
    element: 0,
    baseStats: {
        hp: 170,
        mp: 165,
        attack: 115,
        defense: 92,
        speed: 80
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dragon',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: ["MetalGreymon", "RizeGreymon"]
    },
    moves: [0, "Middle Tackle", "Dramon Claw", "Mega Napalm", "Double D Claw", "Fiery Breath"],
    traits: ["Powerful 3", "Critical 2"]
},{
    did: 87,
    species: "Tyrannomon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/c/c1/Tyrannomon_vg.gif",
    description: "A Digimon that resembles an ancient dinosaur.\n It can send anything flying with its strong arms and giant tail. It is intelligent and gentle, making it easy to get to know it.",
    form: 2,
    attribute: 1,
    family: 0,
    element: 0,
    baseStats: {
        hp: 168,
        mp: 168,
        attack: 112,
        defense: 78,
        speed: 75
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dragon',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Middle Tackle", "Dramon Claw", "Sharp Fang", "Mega Napalm", "Fire Breath"],
    traits: ["Fire Aura 3", "Psychic 3"]
},{
    did: 88,
    species: "Devimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/a/a6/Devimon_vg.gif",
    description: "A fallen angel-type Digimon with impressive black attire and ragged wings.\n It used to be an angel, but it was affected by evil influences and marked by an evil sign.\n It has a heinous personality, but it is loyal to its master.",
    form: 2,
    attribute: 1,
    family: 7,
    element: 1,
    baseStats: {
        hp: 166,
        mp: 170,
        attack: 108,
        defense: 82,
        speed: 79
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dark',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Dark Claw", "Black Blast", "Black Boat", "Death Cannon", "Touch of Evil"],
    traits: ["Dark Breath 3", "Critical 2"]
},{
    did: 89,
    species: "Airdramon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/e/ed/Airdramon_vg.gif",
    description: "A Digimon flying with huge wings in the big sky over the Digital World.\n Since it's a rare species, it's called a shadowy Digimon.\n It's also said to be close to God. It possesses the power to summon storms and twisters.",
    form: 2,
    attribute: 1,
    family: 0,
    element: 0,
    baseStats: {
        hp: 147,
        mp: 180,
        attack: 85,
        defense: 93,
        speed: 94
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dragon',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Small Tornado", "Air Cutter", "Healing Air", "Hyper-Tornado", "Fatal Tornado"],
    traits: ["Sylph Aegis 4", "Speed 3"]
},{
    did: 90,
    species: "Seadramon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/96/Seadramon_vg.gif",
    description: "A Digimon with a snake-like long body which lives in the water. Despite its appearance, it has a gentle manner.\n Usually, it's swimming in the water at leisure, but once the battle starts, it shows its aggressive side.",
    form: 2,
    attribute: 3,
    family: 4,
    element: 1,
    baseStats: {
        hp: 151,
        mp: 172,
        attack: 105,
        defense: 94,
        speed: 73
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'aquatic',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Ice Blast", "Water Coat", "Double Wave", "Big Ice Blast", "Water Wave"],
    traits: ["Mist Cape 3", "Quick 2"]
},{
    did: 91,
    species: "Numemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/a/ae/Numemon_vg.gif",
    description: "A Digimon with a slug-like body.\n It prefers dark, moist places and has little in the way of fighting power or intelligence, but lives its life freely every day.\n It surprises enemies by throwing poop to protect itself.",
    form: 2,
    attribute: 1,
    family: 1,
    element: 2,
    baseStats: {
        hp: 143,
        mp: 182,
        attack: 82,
        defense: 97,
        speed: 69
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'aquatic',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Frothier Spit", "Junk Attack", "Raging Water", "Random Poop", "Nume Charge"],
    traits: ["Flee 2", "Numb Ward 2"]
},{
    did: 92,
    species: "Kabuterimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/0/01/Kabuterimon_vg.gif",
    description: "A blue Digimon which looks like a beetle.\n Its big body is full of energy that enables it to fight boldly.\n It's covered with a solid carapace and has a good defensive ability. Its head is especially metallic and sturdy.",
    form: 2,
    attribute: 2,
    family: 8,
    element: 3,
    baseStats: {
        hp: 168,
        mp: 161,
        attack: 106,
        defense: 102,
        speed: 81
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'plant/insect',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Thunder Claw", "Middle Tackle", "Double Blaster", "Power Cutter", "Electro Shocker"],
    traits: ["Thunder Sign 3", "Protect 3"]
},{
    did: 93,
    species: "Garurumon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/6/66/Garurumon_vg.gif",
    description: "A fox-like Digimon.\n Its fury is very strong like the legendary rare metal, \"mithril\" and its shoulder blades are so sharp that they cut everything to pieces.\n It's very intelligent and loyal to its master.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 1,
    baseStats: {
        hp: 166,
        mp: 165,
        attack: 101,
        defense: 80,
        speed: 83
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Sharp Claw", "Middle Tackle", "Sharp Fang", "Mega Napalm", "Freeze Fang"],
    traits: ["Speed 3", "Powerful 3"]
},{
    did: 94,
    species: "Angemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/7/7f/Angemon_vg.gif",
    description: "An angel-type Digimon with 6 wings and pure white attire.\n It's a perfect embodiment of good and said to lead all the Digimon to happiness.\n However, it's very harsh toward opponents and it keeps on attacking them with no mercy.",
    form: 2,
    attribute: 2,
    family: 6,
    element: 6,
    baseStats: {
        hp: 150,
        mp: 178,
        attack: 95,
        defense: 77,
        speed: 88
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'holy',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Grand Cross", "Big Tornado", "Celestial Cross", "Celestial Hand", "Heaven Knuckle"],
    traits: ["Psychic 3", "Halo 3"]
},{
    did: 95,
    species: "Veggiemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/2/21/Veggiemon_vg.gif",
    description: "An insectivorous plant-type Digimon with distinguishing long arms like ivy and a wide-open mouth.\n It tempts small insects with sweet smells and catches them with its long ivy.\n When it grows, it turns into a flower, and later a fruit.",
    form: 2,
    attribute: 1,
    family: 8,
    element: 3,
    baseStats: {
        hp: 152,
        mp: 194,
        attack: 82,
        defense: 93,
        speed: 73
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'plant/insect',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Light Tackle", "Junk Attack", "Rain of Pollen", "Stun Whipping", "Branch Drain"],
    traits: ["Money Saver 2", "Flee 2"]
},{
    did: 96,
    species: "Ogremon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/6/6c/Ogremon_vg.gif",
    description: "A goblin-like Digimon with a short temper.\n It loves to fight. Its nickname \"Digimon Hunter\" comes from the fact that it challenges stronger Digimon than itself.\n The Bone Club he carries is loot from when it defeated SkullGreymon.",
    form: 2,
    attribute: 1,
    family: 1,
    element: 7,
    baseStats: {
        hp: 167,
        mp: 180,
        attack: 116,
        defense: 95,
        speed: 70
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dark',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Gatling Punch", "Raging Beast", "Pummel Whack", "Winning Punch", "Bone Strike"],
    traits: ["Powerful 3", "Mother Earth 3"]
},{
    did: 97,
    species: "Bakemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/e/e3/Bakemon_vg.gif",
    description: "A ghost Digimon made from cursed virus programs.\n It possesses Digimon and destroys them in the blink of an eye.\n What's inside the white cloth is a mystery, and the shadow below it said to be connected to a black hole.",
    form: 2,
    attribute: 1,
    family: 1,
    element: 7,
    baseStats: {
        hp: 156,
        mp: 189,
        attack: 86,
        defense: 93,
        speed: 84
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dark',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Shadow Claw", "Raging Darkness", "Dark Claw", "Dark Knowledge", "Touch of Evil"],
    traits: ["Death Ward 1", "Quick 2"]
},{
    did: 98,
    species: "Sukamon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/3/3a/Sukamon_vg.gif",
    description: "A Digimon which looks like a poop.\n They say that clusters of data got built up and mutated. A Chuumon, always attached to it, becomes its brain and tempts Sukamon by guile to do bad things.",
    form: 2,
    attribute: 1,
    family: 5,
    element: 10,
    baseStats: {
        hp: 158,
        mp: 177,
        attack: 84,
        defense: 88,
        speed: 77
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'machine',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Energy Bolt", "Sharp Claw", "Junk Attack", "Random Poop", "Scar Nail"],
    traits: ["Ether Eddy 3", "Antidote 2"]
},{
    did: 99,
    species: "KoKatorimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/9e/Kokatorimon_vg.gif",
    description: "A chicken-like Digimon. It spent too much time on the ground, and as a reslt it can't fly in the sky any more.\n Instead, it's gotten advanced legs and become a bully.\n It isn't good at battles which require lots of energy.",
    form: 2,
    attribute: 3,
    family: 3,
    element: 9,
    baseStats: {
        hp: 159,
        mp: 185,
        attack: 101,
        defense: 76,
        speed: 80
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'bird',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Sharp Claw", "Air Cutter", "Cross Cutter", "Petrifier", "Feather Shoot"],
    traits: ["Sylph Aegis 3", "Numb Ward 2"]
},{
    did: 100,
    species: "Leomon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/0/0e/Leomon_vg.gif",
    description: "A Digimon which is referred to as the \"king of beasts\" and \"chivalrous\".\n It has a srong will and a sense of justice.\n It gets in shape and fights the enemy with a sword called \"Shishioumaru\" at its side.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 8,
    baseStats: {
        hp: 168,
        mp: 183,
        attack: 74,
        defense: 65,
        speed: 75
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Gatling Punch", "Soulful Kick", "Beast Coat", "Beast King Fist", "Shishiomaru"],
    traits: ["Psychic 3", "Critical 2"]
},{
    did: 101,
    species: "Kuwagamon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/9a/Kuwagamon_vg.gif",
    description: "A Digimon which looks like a stag beetle with a giant pair of mandibles on its head.\n It is protected by its iron power and its tough carapace, but it only possesses fighting instincts.\n Its nemesis is Kabuterimon.",
    form: 2,
    attribute: 1,
    family: 8,
    element: 3,
    baseStats: {
        hp: 160,
        mp: 182,
        attack: 110,
        defense: 72,
        speed: 82
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'plant/insect',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Thunder Claw", "Electric Rage", "Cross Cutter", "Instant Blow", "Shadow Slash"],
    traits: ["Powerful 3", "EX Damage 2"]
},{
    did: 102,
    species: "Raremon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/a/a3/Raremon_vg.gif",
    description: "A Digimon whose muscles are rotting on its body.\n It turned out like this because it mechanized the body beyond the limit.\n Its data is corrupted and it acts entirely on instinct.\n Its body odor is very strong.",
    form: 2,
    attribute: 1,
    family: 9,
    element: 7,
    baseStats: {
        hp: 169,
        mp: 166,
        attack: 114,
        defense: 117,
        speed: 62
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dark',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Dark Crusher", "Dark Claw", "Black Coat", "Black Blast", "Scar Nail"],
    traits: ["Dark Breath 3", "EX Damage 2"]
},{
    did: 103,
    species: "Gekomon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/1/1c/Gekomon_vg.gif",
    description: "This Digimon has a beautiful voice that seems at odds with its appearance.\n It uses it to captivate all those around it.\n It creates harmony from three holds in it's tongue and plays a song with the horn around it's neck.",
    form: 2,
    attribute: 1,
    family: 4,
    element: 2,
    baseStats: {
        hp: 149,
        mp: 178,
        attack: 83,
        defense: 84,
        speed: 80
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'aquatic',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Frothier Spit", "Sonic Voice", "Lullaby Bubble", "Acid Rain", "Water Wave"],
    traits: ["Collector 2", "Sleep Ward 2"]
},{
    did: 104,
    species: "Gatomon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/96/Gatomon_vg.gif",
    description: "A Digimon which looks like a small cat.\n The holy ring attached to its tail is the mark of a Holy Digimon. But, if it's taken, it loses power.\n It copied SaberLeomon's claws and wears them.\n It can armor digivolve with a DigiEgg.",
    form: 2,
    attribute: 2,
    family: 6,
    element: 6,
    baseStats: {
        hp: 151,
        mp: 181,
        attack: 97,
        defense: 76,
        speed: 85
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'holy',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Sharp Claw", "Raging Light", "Light Coat", "Starlight", "Heaven Knuckle"],
    traits: ["Halo 3", "Lucky Medal 2"]
},{
    did: 105,
    species: "Wizardmon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/d/da/Wizardmon_vg.gif",
    description: "A Digimon from another dimension's Digital World.\n It wants to be a great wizard and appeared in the Digital World in order to train.",
    form: 2,
    attribute: 3,
    family: 1,
    element: 7,
    baseStats: {
        hp: 153,
        mp: 188,
        attack: 95,
        defense: 81,
        speed: 84
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dark',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Normal Bomb", "Shock Net", "Dark Knowledge", "Mega Napalm", "Thunder Ball"],
    traits: ["Psychic 3", "Hard rock 2"]
},{
    did: 106 ,
    species: "Togemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/b/b0/Togemon_vg.gif",
    description: "A Digimon which looks like a huge cactus.\n It can store data of nutrients in its body and live in a place where there's nothing around.\n Its personality is laid back, and it's demeanor is tranquil, but it's also a hard worker.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 3,
    baseStats: {
        hp: 166,
        mp: 166,
        attack: 108,
        defense: 96,
        speed: 71
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'plant/insect',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Gatling Punch", "Surprise Blow", "Sonic Counter", "Winning Punch", "Needle Spray"],
    traits: ["Powerful 3", "Critical 2"]
},{
    did: 107,
    species: "Guardromon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/c/cf/Guardromon_vg.gif",
    description: "A Machine Digimon with excellent defense.\n Because it was infected by a bad virus, its emotions were lost and only a protection program survived.\n It's been taken advantage of by a virus which wanted to use the Digimon's power.",
    form: 2,
    attribute: 3,
    family: 5,
    element: 10,
    baseStats: {
        hp: 172,
        mp: 177,
        attack: 106,
        defense: 104,
        speed: 73
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'machine',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Normal Missile", "Energy Shot", "Great Wall", "Twin Missile", "Power Laser"],
    traits: ["Protect 3", "Ether Eddy 3"]
},{
    did: 108,
    species: "Exveemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/3/3a/ExVeemon_vg.gif",
    description: "A powerful legendary dragon-type Digimon.\n Its muscular arms and legs can shatter a boulder into pieces.\n But, because of its sense of justice, it doesn't use its power more than necessary.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 0,
    baseStats: {
        hp: 166,
        mp: 163,
        attack: 114,
        defense: 97,
        speed: 72
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dragon',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Sharp Claw", "Middle Tackle", "Dramon Claw", "Winning Punch", "X Laser"],
    traits: ["Powerful 3", "Psychic 3"]
},{
    did: 109,
    species: "Stingmon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/0/02/Stingmon_vg.gif",
    description: "A humanoid insect Digimon with the hard carapace and speed of an insect Digimon.\n It is a powerful assassin, and can quickly identify and attack its opponent's weak points.",
    form: 2,
    attribute: 1,
    family: 8,
    element: 3,
    baseStats: {
        hp: 154,
        mp: 179,
        attack: 100,
        defense: 79,
        speed: 86
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'plant/insect',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Thunder Claw", "Air Cutter", "Instant Blow", "Wild TD Claw", "Spiking FN"],
    traits: ["Powerful 3", "Psychic 3"]
},{
    did: 110,
    species: "Birdramon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/d/d4/Birdramon_vg.gif",
    description: "A Bird Digimon with feathers like burning flames.\n It's said to be born from the firewall of the internet.\n It flies around in the network with its big wings.",
    form: 2,
    attribute: 2,
    family: 3,
    element: 9,
    baseStats: {
        hp: 149,
        mp: 168,
        attack: 92,
        defense: 75,
        speed: 90
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'bird',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Sharp Claw", "Fire Coat", "Giga Breath", "Meteor Fall", "Meteor Wing"],
    traits: ["Ether Eddy 4", "Speed 3"]
},{
    did: 111,
    species: "Ankylomon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/3/31/Ankylomon_vg.gif",
    description: "A dragon Digimon with hard skin and full body armor.\n Its skin also has spikes poking out of it, giving it impressive destructive power by charging at the enemy.\n It's tame, yet brave",
    form: 2,
    attribute: 2,
    family: 2,
    element: 5,
    baseStats: {
        hp: 182,
        mp: 172,
        attack: 109,
        defense: 109,
        speed: 68
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Middle Tackle", "Beast Coat", "Heavy Tackle", "Power Cutter", "Megaton Press"],
    traits: ["Protect 2", "Mother Earth 2"]
},{
    did: 112,
    species: "Gargomon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/5/5d/Gargomon_vg.gif",
    description: "A hunter Digimon. It can jump high and moves with surprising speed to catch its prey.\n It is never seen without its favorite \"D-VI's 503 XX\" jeans.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 10,
    baseStats: {
        hp: 158,
        mp: 176,
        attack: 113,
        defense: 98,
        speed: 81
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Gatling Punch", "Double Blaster", "Boost On", "Big Tornado", "Bunny Pummel"],
    traits: ["Powerful 3", "Quick 2"]
},{
    did: 113,
    species: "Growlmon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/c/c6/Growlmon_vg.gif",
    description: "A magic dragon Digimon with a red body and a white mane.\n It's ferocious just like other virus species.\n It has a violent personality, but depending on how it is raised it may fight for justice.",
    form: 2,
    attribute: 1,
    family: 0,
    element: 0,
    baseStats: {
        hp: 175,
        mp: 161,
        attack: 117,
        defense: 94,
        speed: 67
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dragon',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Dramon Claw", "Mega Napalm", "Power Cutter", "Double D Claw", "Fire Breath"],
    traits: ["Fire Aura 3", "Powerful 3"]
},{
    did: 114,
    species: "Kyubimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/0/09/Kyubimon_vg.gif",
    description: "This Digimon looks like a fox and has nine tails with burning blue flame.\n It evolves from a Renamon after acquiring a lot of experience.\n It's mentally strong and is good at manipulating various skills.",
    form: 2,
    attribute: 3,
    family: 1,
    element: 7,
    baseStats: {
        hp: 149,
        mp: 183,
        attack: 87,
        defense: 84,
        speed: 86
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'holy',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Small Breath", "Light Coat", "Mega Napalm", "Holy Cannon", "Foxtail Inferno"],
    traits: ["Powerful 3", "Quick 2"]
},{
    did: 115,
    species: "Chrysallimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/e/ec/Kurisarimon_vg.gif",
    description: "This is a Keramon becoming a chrysalis and absorbing a lot of energy to get stronger.\n Although it cannot move, it is protect by its thick skin and uses the feelers on its back to attack its enemies.",
    form: 2,
    attribute: 1,
    family: 1,
    element: 7,
    baseStats: {
        hp: 177,
        mp: 168,
        attack: 104,
        defense: 113,
        speed: 60
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dark',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Raging Darkness", "Cursed Slash", "Dark Counter", "Metal Essence", "Data Crusher"],
    traits: ["Protect 3", "Dark Breath 3"]
},{
    did: 116,
    species: "Seasarmon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/0/0a/Seasarmon_vg.gif",
    description: "This Digimon looks like the holy beast, \"Shiisaa\".\n It is a friend to all those with kind hearts, but attacks evil opponents using its incredible power heedless of danger.\n It spends most of its time basking in the sun to recharge its energy.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 5,
    baseStats: {
        hp: 160,
        mp: 168,
        attack: 92,
        defense: 95,
        speed: 79
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: [],
        to: [""]
    },
    moves: [0, "Middle Tackle", "Flash Ray", "Saint Heal", "Holy Cannon", "Energy Ray"],
    traits: ["Quick 2", "Death Ward 2"]
},
{
    did: 117,
    species: "Vilemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/f/ff/Vilemon_vg.gif",
    description: "A small demon Digimon which is a prototype of Dark Digimon.\n It is a little mischievous and cynical.\n It's good friends with DemiDevimon and they do naughty things together.",
    form: 2,
    attribute: 1,
    family: 1,
    element: 7,
    baseStats: {
        hp: 152,
        mp: 164,
        attack: 96,
        defense: 73,
        speed: 82
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dark',
                amount: 30250
            },
            level: 30
        },
        from: ["Tsukaimon"],
        to: ["LadyDevimon", "Myotismon", "SkullSatamon"]
    },
    moves: [0, "Shadow Claw", "Raging Darkness", "Sonic Voice", "Nightmare", "Touch of Evil"],
    traits: ["Dark Breath 3", "Sleep Ward 2"]
},{
    did: 118,
    species: "Aquilamon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/7/7c/Aquilamon_vg.gif",
    description: "A giant bird Digimon with large horns growing out of its head.\n Flying at Mach speed, it can spot its enemies from far away and attack them with horns and beak.",
    form: 2,
    attribute: 3,
    family: 3,
    element: 9,
    baseStats: {
        hp: 161,
        mp: 174,
        attack: 105,
        defense: 96,
        speed: 81
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'bird',
                amount: 30250
            },
            level: 30
        },
        from: ["Hawkmon"],
        to: ["Sylphmon (+Gatomon)"]
    },
    moves: [0, "Raging Wind", "Sonic Voice", "Instant Blow", "Cyclone Claw", "Blast Shot"],
    traits: ["Powerful 3", "Sylph Aegis 3"]
},{
    did: 119,
    species: "Roachmon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/c/cc/Roachmon_vg.gif/revision/latest?cb=20130421021849",
    description: "A Digimon with a repulsive cockroach-like body.\n It can move with surprising speed. It has a strong will to live and is very similar to roaches in its characteristics.",
    form: 2,
    attribute: 1,
    family: 8,
    element: 3,
    baseStats: {
        hp: 150,
        mp: 189,
        attack: 84,
        defense: 80,
        speed: 99
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'plant/insect',
                amount: 30250
            },
            level: 30
        },
        from: [""],
        to: ["MegaKabuterimon (Red)", "MegaKabuterimon (Blue)"]
    },
    moves: [0, "Surprise Blow", "Junk Attack", "Black Blast", "Instant Blow", "Electro Shocker"],
    traits: ["Speed 3", "Flee 2"]
},{
    did: 120,
    species: "Dinohumon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/1/1e/Dinohumon_vg.gif",
    description: "This dragon Digimon is a fierce warrior.\n It is incredibly muscular and brave.",
    form: 2,
    attribute: 3,
    family: 0,
    element: 0,
    baseStats: {
        hp: 157,
        mp: 167,
        attack: 109,
        defense: 92,
        speed: 69
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dragon',
                amount: 30250
            },
            level: 30
        },
        from: ["Monodramon"],
        to: ["Knightmon", "Cyberdramon"]
    },
    moves: [0, "Normal Blade", "Cross Cutter", "Cure Poison", "Blazing Power", "Dino Slash"],
    traits: ["Psychic 3", "Numb Ward 2"]
},{
    did: 121,
    species: "Hookmon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/4/49/Hookmon_vg.gif",
    description: "A mutant sailor Digimon who braves the rough waves of the Net Ocean in search of the legendary \"White Whamon.\"\n It is a warrior on the sea, one arm is a hook, and the other is a cannon.",
    form: 2,
    attribute: 1,
    family: 5,
    element: 10,
    baseStats: {
        hp: 162,
        mp: 173,
        attack: 107,
        defense: 93,
        speed: 72
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'machine',
                amount: 30250
            },
            level: 30
        },
        from: [""],
        to: ["Dragomon"]
    },
    moves: [0, "Tiny Metal", "Normal Blade", "Energy Shot", "Battle Stamp", "Metal Shot"],
    traits: ["Mist Cape 3", "Collector 2"]
},{
    did: 122,
    species: "Grizzlymon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/a/a1/Grizzmon_vg.gif",
    description: "Digivolves from Bearmon.\n It may look ferocious, but it fights fairly. Its blow is very sharp.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 5,
    baseStats: {
        hp: 169,
        mp: 160,
        attack: 113,
        defense: 98,
        speed: 82
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: ["Bearmon"],
        to: ["Pandamon", "GrapLeomon", "Monzaemon"]
    },
    moves: [0, "Pummel Whack", "Sharp Fang", "Sonic Counter", "Cyclone Claw", "Heavy Attack"],
    traits: ["Powerful 3", "Quick 2"]
},{
    did: 123,
    species: "Dorugamon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/1/1d/Dorugamon_vg.gif",
    description: "A mere look at this fierce Digimon's shadow is enough to cause most Digimon to flee.\n It fights ferociously, but has a dragon's intelligence, so it is generally rather gentle.",
    form: 2,
    attribute: 1,
    family: 2,
    element: 5,
    baseStats: {
        hp: 170,
        mp: 163,
        attack: 112,
        defense: 102,
        speed: 80
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: ["Dorumon"],
        to: ["Dorugreymon"]
    },
    moves: [0, "Sharp Claw", "Middle Tackle", "Sharp Fang", "Heavy Metal", "Fighting Spirit"],
    traits: ["Protect 3", "Lucky Medal 2"]
},{
    did: 124,
    species: "Reptiledramon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/b/bf/Reptiledramon_vg.gif",
    description: "A Machine Digimon created using wild Digimon as a base.\n Its athletic abilities are so high that it uses heavy Chrome Digizoid to slow itself down.",
    form: 2,
    attribute: 2,
    family: 0,
    element: 0,
    baseStats: {
        hp: 162,
        mp: 170,
        attack: 114,
        defense: 99,
        speed: 83
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'dragon',
                amount: 30250
            },
            level: 30
        },
        from: ["Dorumon"],
        to: ["Grademon"]
    },
    moves: [0, "Normal Blade", "Dramon Claw", "Sharp Fang", "Forlorn Fang", "Dino Slash"],
    traits: ["Ether Eddy 3", "EX Damage 2"]
},{
    did: 125,
    species: "Apemon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/c/c1/Apemon_vg.gif",
    description: "A legendary Digimon with golden fur.\n It is said that it possesses the power to defeat computer viruses and rides a cloud-like object as it flies around the network at high speeds.\n It's hard to find it.",
    form: 2,
    attribute: 2,
    family: 2,
    element: 5,
    baseStats: {
        hp: 159,
        mp: 188,
        attack: 97,
        defense: 77,
        speed: 91
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'beast',
                amount: 30250
            },
            level: 30
        },
        from: [""],
        to: ["Gokuwmon", "Mammothmon"]
    },
    moves: [0, "Unexpected Blow", "Holy Hand", "Heavy Metal", "Mind Reader", "Bone Strike"],
    traits: ["Speed 3", "Sniper 2"]
},{
    did: 126,
    species: "Starmon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/6/64/Starmon_vg.gif",
    description: "A mutant warrior with star-shaped armor that wears gloves and boots with star symbols on them.\n Its eyes burn with fighting spirit and can communicate without words.\n It adores Leomon, the brave.",
    form: 2,
    attribute: 3,
    family: 6,
    element: 6,
    baseStats: {
        hp: 161,
        mp: 173,
        attack: 91,
        defense: 91,
        speed: 80
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'holy',
                amount: 30250
            },
            level: 30
        },
        from: [""],
        to: ["SuperStarmon"]
    },
    moves: [0, "Soulful Kick", "Holy Hand", "Boost Tackle", "Meteor Fall", "Meteor Squall"],
    traits: ["Protect 3", "Hard Rock 2"]
},{
    did: 127,
    species: "BomberNanimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/0/0c/BomberNanimon_vg.gif",
    description: "A Digimon that belongs to the same category as Nanimon.\n Its whole body is a bomb with hair like a fuse wire on its head.\n It's very dangerous.",
    form: 2,
    attribute: 1,
    family: 5,
    element: 10,
    baseStats: {
        hp: 155,
        mp: 186,
        attack: 112,
        defense: 87,
        speed: 79
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'machine',
                amount: 30250
            },
            level: 30
        },
        from: [""],
        to: [""]
    },
    moves: [0, "Tiny Bomb", "Normal Bomb", "Boost Tackle", "Gatling Bomb", "Powerful Punch"],
    traits: ["Critical 2", "Flee 2"]
},{
    did: 128,
    species: "Kiwimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/3/39/Kiwimon_vg.gif",
    description: "An ancient Digimon that was thought to be extinct.\n It possesses the characteristics of both birds and plants.\n Its wings have completely disappeared, making it unable to fly.\n It can perform photosynthesis with the leaf-like things on its head.",
    form: 2,
    attribute: 3,
    family: 3,
    element: 9,
    baseStats: {
        hp: 151,
        mp: 174,
        attack: 88,
        defense: 90,
        speed: 74
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'bird',
                amount: 30250
            },
            level: 30
        },
        from: ["Palmon"],
        to: ["Blossomon", "Sirinmon", "Deramon"]
    },
    moves: [0, "Light Tackle", "Tiny Bomb", "Cross Cutter", "Gaia Healing", "Blast Shot"],
    traits: ["Flee 2", "Money Saver 2"]
},{
    did: 129,
    species: "Unimon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/a/a2/Unimon_vg.gif",
    description: "A Digimon with a unicorn's horn and the wings of a Pegasus.\n It uses its great wings to fly around the network.\n Its horn can be used to stab its enemies.\n A wild Unimon is so dangerous that others should not get too close to it carelessly.",
    form: 2,
    attribute: 2,
    family: 6,
    element: 6,
    baseStats: {
        hp: 149,
        mp: 175,
        attack: 96,
        defense: 75,
        speed: 87
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'holy',
                amount: 30250
            },
            level: 30
        },
        from: [""],
        to: ["HippoGriphomon"]
    },
    moves: [0, "Air Gun", "Holy Bolt", "Middle Tackle", "Top Gun", "Aerial Attack"],
    traits: ["Sylph Aegis 3", "Protect 2"]
},{
    did: 130,
    species: "Sorcerymon",
    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/96/Sorcerymon_vg.gif",
    description: "Related to Wizardmon, this Digimon wears a white cloak and has a mysterious aura.\n By praying, it charges Holy power to its body.",
    form: 2,
    attribute: 2,
    family: 6,
    element: 6,
    baseStats: {
        hp: 148,
        mp: 190,
        attack: 93,
        defense: 86,
        speed: 83
    },
    evolution: {
        evoType: 0,
        requirements: {
            // 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
            xp: {
                xpType: 'holy',
                amount: 30250
            },
            level: 30
        },
        from: [""],
        to: [""]
    },
    moves: [0, "Starlight", "Healing Air", "Big Ice Blast", "Lore of Light", "Meteor Squall"],
    traits: ["Psychic 3", "Hard Rock 2"]
},
{
    did: 144,
    species: "Monzaemon",
    sprite: "https://ik.imagekit.io/projectvoyage/Digimons/Monzaemon_9tYuIhQtz.gif?updatedAt=1679269256004",
    description: 'A Digimon that is completely shrouded in mystery. From its looks, it\'s an unmodified plush toy of a bear, so it\'s rumored that there is someone within, who got in through where the zipper is attached on its back section. It wraps the opponent up in the love overflowing from this cute body (with scary eyes), and makes them feel happy. Its Special Move is its "Lovely Attack", in which it flings hearts.',
    form: 3,
    attribute: 2,
    family: 5,
    element: 6,
		baseStats: {
			hp: 230,
			mp: 238,
			attack: 123,
			defense: 122,
			speed: 90
		},
		evolution: {
			evoType: {
				type: Number,
				default: 0
			},
			requirements: {
				// 0 aquatic,1 beast,2 bird,3 dark,4 dragon,5 holy,6 machine,7 plant/insect
				xp: {
					xpType: 'beast',
					amount: 3200
				},
				level: 5
			},
			from: [],
			to: []
		},
    moves: ["Charge", "Lovely Attack", "Boom Boom Punch", "Silence Hug", "Love Song", "Lovely Charm", "Ai no Houkou", "Mekara Beam"],
    traits: []
}
]

