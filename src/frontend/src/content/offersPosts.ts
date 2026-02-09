export interface OfferPost {
  slug: string;
  title: string;
  emoji: string;
  shortDescription: string;
  metaDescription: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

export const offerPosts: Record<string, OfferPost> = {
  'off-the-beaten-path': {
    slug: 'off-the-beaten-path',
    title: 'Off the Beaten Path',
    emoji: '🗺️',
    shortDescription: 'Hidden gems, secret spots, and places the tour buses can\'t reach. This is Scotland unfiltered and RAW!',
    metaDescription: 'Hidden gems, secret spots, and places the tour buses can\'t reach. Experience Scotland unfiltered and RAW with Dirty Daves private tours - for those who want the real shit.',
    sections: [
      {
        heading: 'Welcome to Your Tribe',
        content: [
          'Listen up, you beautiful degenerates. If you\'re the sort of person who sees a massive coach full of selfie-stick zombies blocking the view at Loch Ness and thinks, "Fuck that, I want the real shit," then congratulations—you\'ve found your tribe. I\'m Dirty Dave, and my private tours aren\'t for the faint-hearted, the easily offended, or anyone who clutches their pearls at a well-timed "cunt" (the Scottish term of endearment, obviously).',
          'Forget the scripted patter and the "mind the gap" bullshit. We\'re talking Scotland as nature intended: rugged, ridiculous, occasionally soaked in whisky sweat, and 100% off the postcard trail. The places where the tour buses literally can\'t fit—or wouldn\'t dare go because their insurance would have a meltdown.'
        ]
      },
      {
        heading: 'Picture This:',
        content: [
          '• A tiny bothy tucked so deep in the Cairngorms that the only way in is on foot (or if you\'re feeling particularly lazy, I\'ll carry your arse in the van)',
          '• A forgotten coastal cave where smugglers once stashed their contraband, now just us, a flask of something peaty, and stories that\'ll make your nan blush from the grave.',
          '• That one random Highland pub with three locals, a dog that hates tourists, and a dartboard that\'s seen more violence than most relationships. We\'ll charm (or bribe) our way in, and you\'ll leave with new best mates, questionable life advice and maybe even an STD if you\'re lucky.'
        ]
      },
      {
        heading: 'Why Bother with the Hidden Stuff?',
        content: [
          'Because the famous spots are great… for about five minutes. Then the crowds arrive, the magic dies, and you\'re just another arse in a photo. My tours flip that on its head. Private means your group only—no random aunties from Ohio asking if we have Wi-Fi. We go where the roads end, the midges get cheeky, and the views hit like a freight train of "holy fuck, this is actually real."',
          'And yeah, it\'s edgy. Expect banter that\'s filthier than a Glasgow kebab wrapper on a Saturday night. Expect me to call out the tourist traps for the cash-grabs they are. Expect zero apologies for laughing at the absurd history of this mad wee country—because if we can\'t take the piss out of our own clan feuds, witch burnings, and national obsession with deep-fried everything, what\'s the point?'
        ]
      },
      {
        heading: 'This Isn\'t Just a Tour',
        content: [
          'It\'s an escape from the sanitized, Instagram-approved version of Scotland. It\'s raw, it\'s real, and it\'s rude in the best possible way. If you\'re game for hidden glens, secret whisky stashes, abandoned castles that look like they were designed by a drunk architect, and a guide who gives precisely zero fucks about being "professional"… then buckle up.',
          'Hit me up, let\'s get filthy.',
          'Dirty Dave\'s – Because life\'s too short for boring tours.'
        ]
      }
    ]
  },
  'private-and-personal': {
    slug: 'private-and-personal',
    title: 'Private & Personal',
    emoji: '👥',
    shortDescription: 'Just you, your crew, and Dave. No strangers, no schedules, no bullshit. Your tour, your rules, your adventure!',
    metaDescription: 'Just you, your crew, and Dave. No strangers, no schedules, no bullshit. Private Scotland tours where you set the rules with Dirty Daves - your tour, your adventure.',
    sections: [
      {
        heading: 'Right, let\'s cut the crap.',
        content: [
          'You\'ve seen the shiny brochures: "Join our small group tour! Only 16 people!" Aye, 16 strangers crammed in a minibus, all pretending to laugh at the same tired jokes while someone in the back asks to stop for the toilet every 20 minutes. Fuck that noise.',
          'I\'m Dirty Dave, and my tours are built for one thing: you. Your group. Your mates, your partner, your hen/stag party, your weird family reunion—whatever chaotic crew you\'ve got. Private means exactly that: no randoms. No awkward small talk with Karen from Kansas who\'s on her third "spiritual journey" to find herself (spoiler: she\'s still lost). No forced sing-alongs to "Flower of Scotland" because the guide thinks it\'s cute. Just us, the van, Scotland\'s wild bits, and whatever madcap plan we cobble together on the day.'
        ]
      },
      {
        heading: 'Why does this matter?',
        content: [
          'Because real adventures don\'t come with a fucking timetable. Want to chase a sunrise over a misty glen because you had too much peaty last night and fancy a poetic piss-up at dawn? Done. Fancy ditching the distillery queue to hunt down a secret bothy for a picnic that involves more swearing than sandwiches? Sorted. Pissed off with the weather and want to pivot to a dodgy pub crawl in a village nobody\'s heard of? Say the word, and we\'re off.',
          'No rigid itineraries here (unless you really want one… you are the boss after all). I might rock up with a loose plan scribbled on a napkin (or more likely, in my head after last night\'s session), but the second you say "Dave, this is shite—let\'s do something else," we change course. Your tour, your rules. Want to spend half the day in a hidden cave telling filthy smuggling stories? Fine. Want to detour for the best chippy in the Highlands because you\'re hungover and craving grease? I\'m your man. Want me to pull over so you can skinny-dip in a freezing loch for the \'gram? I\'ll film it and narrate like David Attenborough on acid.'
        ]
      },
      {
        heading: 'And yeah, it\'s personal.',
        content: [
          'I don\'t do the polished, scripted patter. I tell it like it is: the good, the bad, the bloody hilarious. Expect stories that\'ll make you spit your dram, banter that\'s filthier than a Glasgow close on bin day, and zero tolerance for pretentious tourist bullshit. If you want a guide who calls a castle "a pile of old stones where posh cunts used to fight over sheep," that\'s me. If you want someone who\'ll laugh at your terrible jokes and match your energy (or dial it up when you\'re flagging), that\'s also me.',
          'This is Scotland without the corporate gloss. Raw, ridiculous, and ridiculously fun. No coaches, no crowds, no compromises. Just you lot, me driving like a lunatic (safely, mostly), a boot full of snacks/whisky/ questionable decisions, and memories that\'ll have you pissing yourself laughing years later.'
        ]
      },
      {
        heading: 'Fancy turning your Scotland trip into something that\'s actually yours?',
        content: [
          'Not some pre-packaged package holiday for sheep in human form?',
          'Hit the button below. Tell me your crew size, your dates, your vibe (be as filthy or fancy as you like), and we\'ll build the adventure. No deposit nonsense until we\'re locked in. No strangers. No schedules. No bullshit.',
          'Just pure, unfiltered Dirty Dave chaos.',
          'See you on the road, you legends.',
          'Dirty Dave\'s – Private tours done properly (or improperly, depending on the day).'
        ]
      }
    ]
  },
  'flexible-as-hell': {
    slug: 'flexible-as-hell',
    title: 'Flexible as Hell',
    emoji: '⏰',
    shortDescription: 'Want to spend an extra hour at that castle? Or skip it for a proper pub session? You\'re the boss!',
    metaDescription: 'Flexible Scotland tours where you set the pace. Spend more time at castles or hit the pub instead - you\'re the boss with Dirty Daves private tours.',
    sections: [
      {
        heading: 'Throw Away the Schedule',
        content: [
          'You know what sucks about most tours? That rigid schedule. "You have exactly 23 minutes at this castle, then back on the bus!" Like you\'re in some kind of military operation.',
          'Screw that. When you\'re with me, time is flexible. Found a spot you absolutely love? Stay longer. Bored with something? We move on. Simple as that.',
          'I\'ve got a rough plan for every tour - I\'m not completely winging it - but that plan is written in pencil, not carved in stone. If the weather\'s perfect and you want to spend an extra hour hiking to that viewpoint, we\'re doing it. If it\'s pissing rain and you\'d rather find a cozy pub, I know just the place.'
        ]
      },
      {
        heading: 'Real-Time Adjustments',
        content: [
          'Here\'s a typical scenario: We\'re at a distillery, and you\'re absolutely loving the whisky tasting. The guide is telling amazing stories, you\'re trying drams you\'ve never heard of, and you\'re having the time of your life.',
          'On a regular tour? "Sorry, we have to leave in 5 minutes to stay on schedule." With me? "Fancy another dram? We can skip that next stop or just run a bit late. No worries."',
          'Or maybe we\'re driving through the Highlands and you spot an incredible photo opportunity. Regular tour? They\'re not stopping. Me? "Hold on, let me pull over. Take your time, get the shot, I\'ll be here when you\'re ready."'
        ]
      },
      {
        heading: 'Your Pace, Your Way',
        content: [
          'Some people want to pack everything in and see as much as possible. Others want to take it slow and really soak in each place. Both are fine. Both are valid. And both are possible when you\'re not locked into someone else\'s schedule.',
          'Want to start early and finish late? Let\'s do it. Prefer a leisurely start after a proper breakfast? No problem. Need to stop every hour for a smoke break? I\'ll find the scenic spots.',
          'The point is, this is YOUR holiday. You shouldn\'t have to rush through the bits you love or waste time on the bits you don\'t. That\'s what flexibility means - the freedom to experience Scotland exactly how you want to.'
        ]
      }
    ]
  },
  'stories-and-banter': {
    slug: 'stories-and-banter',
    title: 'Stories & Banter',
    emoji: '✨',
    shortDescription: 'History, legends, and the kind of stories that make you laugh until your face hurts. Pure entertainment!',
    metaDescription: 'Scotland tours with filthy stories, legends, and banter that make you laugh until your face hurts. Experience history the Dirty Dave way - pure entertainment with no boring facts.',
    sections: [
      {
        heading: 'Welcome to the Mental Asylum',
        content: [
          'Alright, you lot—buckle up for the bit where Scotland stops being a pretty postcard and starts being a proper mental asylum with kilts. I\'m Dirty Dave, and if you\'ve ever sat through a "historical" tour where the guide drones on like a depressed sheep about dates and battles without a single decent punchline, you\'ll know why my tours are different. We don\'t do dry facts. We do stories. The filthy, ridiculous, "did that actually happen?" kind that have you snorting whisky out your nose and begging for more.',
          'Scotland\'s history isn\'t polite. It\'s a 2,000-year piss-take of clans, kings, witches, monsters, and folk who thought deep-frying their national dish was a good idea. On my private tours, I unleash the lot—no sanitised version. Expect me to explain how Braveheart was mostly Hollywood wank while we stare at a real battlefield soaked in actual blood (and probably sheep shit). Or how the Highland Clearances weren\'t just "sad evictions"—they were posh cunts from the south deciding your ancestors were better off in Canada than on land that could make them richer. I\'ll tell it straight, with the swearing that history deserves, because if we\'re going to drag up the past, we might as well laugh at how absurd it all was.'
        ]
      },
      {
        heading: 'The Legends—The Good Shit',
        content: [
          'Then come the legends—the good shit. Standing stones like Callanish or Machrie Moor? I\'ll spin yarns about druids, aliens, or how locals used them for naked rituals under the moon (probably not, but it\'s funnier that way). Loch Ness? Castles? Every one\'s got a ghost, a murder, or a laird who shagged his way through half the village. I\'ll point out the murder hole, the "priest\'s hole" that was definitely for hiding mistresses and not alter boys and much more.'
        ]
      }
    ]
  },
  'stay-your-way': {
    slug: 'stay-your-way',
    title: 'Stay Your Way',
    emoji: '🛏️',
    shortDescription: 'park bench, shitty hostel, tent, 5 star hotel or your own castle - I dont care where you stay, but will book what ever the fuck you want',
    metaDescription: 'Scotland accommodation your way - from hostels to 5-star hotels to castles. Dirty Daves helps you book whatever suits your style and budget for your Scottish adventure.',
    sections: [
      {
        heading: 'No Judgment, Just Options',
        content: [
          'Here\'s the deal - I don\'t care if you want to stay in a £500-a-night castle or a £15 hostel bunk. Both are valid choices, and both can be part of an amazing Scottish adventure.',
          'Some people want luxury - heated floors, room service, the works. Others want to save money for more whisky and experiences. Some want to camp under the stars. All of these are brilliant options, and I\'ll help you find exactly what you\'re looking for.',
          'I\'ve stayed in everything from bothies (that\'s a free mountain shelter, basically a shed) to five-star hotels. I know what\'s good, what\'s shit, and what\'s worth the money. And I\'ll give you honest advice based on what YOU want, not what makes me the most commission.'
        ]
      },
      {
        heading: 'The Full Range',
        content: [
          'Want to stay in an actual castle? I know several you can book. Want a cozy B&B run by a lovely Scottish couple who\'ll make you a breakfast that\'ll last you all day? Got those too. Prefer a modern hotel with all the amenities? No problem.',
          'Fancy camping? Scotland has some of the best wild camping in Europe, and I can show you spots that\'ll blow your mind. Hostels? I know the good ones - clean, friendly, and full of other travelers. Airbnbs? I can recommend places with character.',
          'And here\'s the thing - you don\'t have to pick just one. Want to mix it up? Spend a night in a castle, then camp by a loch, then crash in a hostel? Absolutely. Your trip, your choice, your budget.'
        ]
      },
      {
        heading: 'I\'ll Sort It For You',
        content: [
          'Planning accommodation can be a pain in the arse, especially if you don\'t know the area. That\'s where I come in. Tell me your budget, your preferences, and your itinerary, and I\'ll sort it.',
          'I know which places are in good locations, which ones are overpriced tourist traps, and which hidden gems offer amazing value. I know which castles are actually comfortable and which ones are just cold and drafty (spoiler: most of them).',
          'And if you want to book it yourself, that\'s fine too. I\'ll just give you recommendations and you can take it from there. Either way, you\'ll end up somewhere that suits you perfectly.'
        ]
      }
    ]
  },
  'choose-your-own-adventure': {
    slug: 'choose-your-own-adventure',
    title: 'Choose Your Own Adventure',
    emoji: '🧭',
    shortDescription: 'History buffs? Castle lovers? Distillery piss-ups? Every strip club in Scotland? Or just a bit of everything? You decide!',
    metaDescription: 'Customizable Scotland tours tailored to your interests - history, castles, whisky, or everything. Choose your own adventure with Dirty Daves private tours.',
    sections: [
      {
        heading: 'Your Interests, Your Tour',
        content: [
          'Scotland has something for everyone, but not everyone wants to see everything. Some people are obsessed with castles. Others just want to drink whisky. Some want to hike mountains. Others want to explore cities. All valid.',
          'That\'s why every tour I do is customized. Before we start, we\'ll have a proper chat about what you\'re into. What gets you excited? What do you absolutely have to see? What can you skip? What\'s on your bucket list?',
          'Then I\'ll build an itinerary around YOUR interests. Not some generic "best of Scotland" tour that tries to please everyone and ends up being mediocre for everyone. A tour that\'s perfect for YOU.'
        ]
      },
      {
        heading: 'The Options Are Endless',
        content: [
          'History buffs? We\'ll hit battlefields, ancient ruins, and museums. I\'ll tell you about the Jacobites, the Wars of Independence, and the Highland Clearances. You\'ll leave knowing more about Scottish history than most Scots.',
          'Castle lovers? Scotland has over 1,500 castles. We\'ll visit the impressive ones, the ruined ones, the haunted ones, and the ones you can actually stay in. You\'ll get your castle fix and then some.',
          'Whisky enthusiasts? Oh boy, are you in for a treat. We\'ll tour distilleries, visit whisky bars, and I\'ll teach you how to actually taste whisky properly. You\'ll try drams you\'ve never heard of and learn why Scottish whisky is the best in the world.',
          'Nature lovers? We\'ll hike glens, climb mountains (or just look at them from the car, no judgment), and visit beaches, lochs, and forests. Scotland\'s natural beauty is absolutely stunning, and I know all the best spots.'
        ]
      },
      {
        heading: 'Mix and Match',
        content: [
          'Here\'s the best part - you don\'t have to pick just one theme. Want to see castles AND drink whisky? Perfect combination. History AND nature? Absolutely. Cities AND countryside? We can do that.',
          'Most people want a bit of everything, and that\'s fine. We\'ll create a balanced itinerary that hits all your interests without feeling rushed or overwhelming.',
          'And if you change your mind during the tour? No problem. We can adjust on the fly. That\'s the beauty of private tours - flexibility. If you thought you\'d love museums but you\'re getting bored, we\'ll pivot to something else. If you\'re having the time of your life at a distillery and want to stay longer, we will.',
          'Your adventure, your rules. I\'m just here to make it happen and keep you entertained along the way.'
        ]
      }
    ]
  }
};
