/* ============================================================================
   EDIT ME — everything personal lives in this one file (js/config.js).
   Change the names, add your anniversary date, rewrite the letters and
   reasons, and add your photos. No other file needs editing.

   NAMES: "her" is her name, "me" is your name. They appear in titles,
   letters, buttons and messages all over the site.

   ANNIVERSARY ("since"): the day you got together, as "YYYY-MM-DD".
   If you are not sure of the exact date, LEAVE IT EMPTY ("").
   When it is empty, the home page shows a sweet line with no day count
   instead of inventing a number. When you set it, the home page shows
   how many days you have been together.

   PHOTOS: put your photo files in the img/ folder, then list them here,
   e.g.  photos: ["img/us1.jpg", "img/us2.jpg"]
   You can also add a caption:  { src: "img/us1.jpg", caption: "Us, happy" }
   Leave photos: [] and the gallery shows pretty placeholder frames with
   instructions instead. No photos of you are included or invented.

   LETTERS: each letter has a title and a body. Use a blank line in the
   body text to start a new paragraph. Keep them in your own words.

   REASONS: a simple list of short reasons. Add or remove as many as
   you like — the cards, shuffle and counter all adapt automatically.
   ========================================================================== */
window.CONFIG = {
  her: "Prashu",
  me: "Samman",
  since: "",

  photos: [],

  letters: [
    {
      title: "The first thing I want you to know",
      body: "Prashu, I made this little corner of the internet just for you, because you deserve a place that is as warm as you make every day feel.\n\nThank you for being the softest part of my loudest days. You have this way of turning an ordinary evening into something I look forward to all day, and I notice every kind thing you do, even the ones you think are small.\n\nI love the way you laugh, the way you care, and the way you make the people around you feel seen. Being with you is the easiest, happiest decision I have ever made.\n\nWherever this life takes us, I want you to know I am proud to be yours, and I am grateful for you today, tomorrow, and every day after that."
    },
    {
      title: "On the days you doubt yourself",
      body: "On the days when you feel like you are not enough, I need you to read this twice: you are, and you always have been.\n\nYou do not have to be perfect for me. You do not have to earn my love by doing more, being more, or hiding the parts of you that feel messy. I love all of you — the brave parts and the tired parts, the loud laughter and the quiet worries.\n\nYou have survived every hard day so far, and you did it with a kind heart still intact. That is not small. That is extraordinary, and I admire you for it more than you know.\n\nWhenever the world feels heavy, come back here and remember: there is someone who thinks the sun rises a little brighter because you exist. That someone is me, always."
    },
    {
      title: "The little things I love about you",
      body: "It is never one big thing with you. It is a hundred little ones, and I keep collecting them like treasures.\n\nI love the way your face lights up when you talk about something you love. I love how you save the last bite and then pretend you were not going to. I love your terrible jokes, and the little pause while you wait to see if I will laugh. I always do.\n\nI love how you hum without noticing, how you get excited about tiny good news, and how you remember the smallest details about the people you love. You pay attention in a world that rushes past, and that is rare.\n\nIf I listed every little thing, this website would never end. So let this letter be the short version: everything about you, all of it, is my favorite."
    },
    {
      title: "What I promise you",
      body: "I promise to keep choosing you — on the easy days and the hard ones, in the big moments and the boring ones.\n\nI promise to listen, really listen, even when I am tired. I promise to be patient, to be honest, and to say sorry when I am wrong. I promise to keep learning the little things that make you smile, because your smile is my favorite thing in the world.\n\nI promise to stand beside you when things are uncertain, to celebrate you loudly when you win, and to hold your hand quietly when you need that instead.\n\nAnd I promise to keep laughing with you. Whatever else changes, we will always have our silly jokes, our late talks, and each other. That is my promise, and I mean every word of it."
    },
    {
      title: "Just because",
      body: "No special occasion. No big reason. Just because you exist, and that is reason enough to celebrate.\n\nI was thinking about you today — the way you make me laugh when I least expect it, the way one message from you can rescue a whole bad day — and I wanted you to know it in this exact moment, not someday later.\n\nYou are my favorite notification, my favorite hello, and my favorite thought at the end of the day.\n\nSo this letter is just to say: I love you, Prashu. Today, for no reason at all, and for every reason at once."
    }
  ],

  reasons: [
    "Your laugh — the real one, not the polite one",
    "The way your eyes light up when you talk about something you love",
    "How kind you are to people who can do nothing for you",
    "Your terrible jokes, and the face you make while waiting for me to laugh",
    "The way you always know when something is wrong with me",
    "How you make even a boring day feel like an adventure",
    "Your good morning messages",
    "The way you sing along even when you forget the words",
    "How brave you are, even on days you do not feel it",
    "Your hugs — the ones that fix everything",
    "The way you get excited about the smallest good news",
    "How you always save me the last bite (or pretend you were going to)",
    "Your honesty, even when it is hard to say",
    "The way you laugh at my jokes before I finish them",
    "How you make my whole family smile too",
    "Your curiosity — you want to know everything about everything",
    "The way you dance when nobody is watching (and when I am)",
    "How patient you are with me on my worst days",
    "Your voice — I could listen to it all day",
    "The way you care about the tiniest details",
    "How one message from you can turn my whole day around",
    "Your courage to always be yourself",
    "The way you hold my hand like it is the easiest thing in the world",
    "How you believe in me more than I believe in myself",
    "Your smile — my favorite view anywhere in the world",
    "The way you make silence feel comfortable",
    "Because with you, home was never a place. It was always a person"
  ],

  gameSeconds: 30
};
