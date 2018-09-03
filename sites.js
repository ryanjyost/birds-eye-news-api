const blank = {
  wikipedia: {
    link: "",
    summary: ""
  },
  links: {
    about: "",
    people: ""
  },
  parent: {
    name: "",
    link: ""
  },
  storySubmit: "",
  inception: 0,
  press: "",
  twitter: ""
};

module.exports = [
  {
    name: "cnn",
    image: "cnn-logo.png",
    url: "https://www.cnn.com",
    file: "cnn",
    title: "CNN",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "http://rss.cnn.com/rss/cnn_allpolitics.rss"
      },
      {
        category: "opinion",
        type: "scrape",
        url: "https://www.cnn.com/opinions"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/CNN",
      summary:
        "Cable News Network (CNN) is an American news-based cable and satellite television channel that is owned by the Turner Broadcasting System, a unit of the AT&T entertainment subsidiary WarnerMedia. CNN was founded in 1980 by American media proprietor Ted Turner as a 24-hour cable news channel. Upon its launch, CNN was the first television channel to provide 24-hour news coverage, and was the first all-news television channel in the United States.\n"
    },
    links: {
      about: "https://www.cnn.com/about",
      people: "https://www.cnn.com/specials/tv/anchors-and-reporters"
    },
    parent: {
      name: "Time Warner Inc.",
      link: "https://www.warnermediagroup.com/"
    },
    storySubmit: "http://cnnspeakers.turner.com/cnnidea.aspx",
    inception: 328708800000,
    press: "http://cnnpressroom.blogs.cnn.com/press-contacts/",
    twitter: "@CNN"
  },
  {
    name: "foxnews",
    image: "foxnews-logo.png",
    url: "https://www.foxnews.com",
    file: "foxnews",
    logo:
      "https://res.cloudinary.com/ryanjyost/image/upload/v1529257416/logos/foxnews-logo.png",
    title: "Fox News",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "http://feeds.foxnews.com/foxnews/politics"
      },
      {
        category: "opinion",
        type: "rss",
        url: "http://feeds.foxnews.com/foxnews/opinion"
      }
    ],

    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Fox_News",
      summary:
        "Fox News (officially known as the Fox News Channel, commonly abbreviated to FNC) is a United States basic cable and satellite television news channel owned by the Fox Entertainment Group, a subsidiary of 21st Century Fox. The channel broadcasts primarily from studios at 1211 Avenue of the Americas in New York City. Fox News is provided in 86 countries or overseas territories worldwide, with international broadcasts featuring Fox Extra segments during ad breaks.\n"
    },
    links: {
      about: "http://www.foxnews.com/about/company/",
      people: "http://www.foxnews.com/person/personalities.html"
    },
    parent: {
      name: "Fox Entertainment Group",
      link: "https://en.wikipedia.org/wiki/Fox_Entertainment_Group"
    },
    storySubmit: "newsmanager@foxnews.com",
    inception: 839419200000,
    press: "http://press.foxnews.com/",
    twitter: "@FoxNews"
  },
  {
    name: "msnbc",
    image: "msnbc-logo.png",
    url: "https://www.msnbc.com",
    file: "msnbc",
    logo:
      "https://res.cloudinary.com/ryanjyost/image/upload/v1529257748/logos/msnbc-logo.svg",
    title: "MSNBC News",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.msnbc.com/feeds/latest"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/MSNBC",
      summary:
        "MSNBC is an American news cable and satellite television network that provides news coverage and political" +
        " commentary from NBC News on current events. MSNBC is owned by the NBCUniversal News Group, a unit of the NBCUniversal Television Group division of NBCUniversal (all of which are ultimately owned by Comcast). MSNBC and its website were founded in 1996 under a partnership between Microsoft and General Electric's NBC unit, hence the network's naming."
    },
    links: {
      about: "",
      people:
        "https://www.nbcumv.com/programming/msnbc/msnbc-news-correspondents"
    },
    parent: {
      name: "NBCUniversal (Comcast)",
      link: "http://www.nbcuniversal.com/"
    },
    storySubmit: "https://www.nbcnews.com/tips",
    inception: 837432000000,
    press: "https://www.nbcumv.com/programming/msnbc/contacts?network=33138",
    twitter: "@MSNBC"
  },
  {
    name: "nytimes",
    image: "nytimes-logo.png",
    url: "https://www.nytimes.com/",
    file: "nytimes",
    title: "The New York Times",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml"
      },
      {
        category: "opinion",
        type: "scrape",
        url:
          "https://www.nytimes.com/section/opinion/contributors?action=click&contentCollection=opinion&region=navbar&module=collectionsnav&pagetype=sectionfront&pgtype=sectionfront"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_New_York_Times",
      summary:
        "The New York Times (sometimes abbreviated as The NYT or The Times) is an American newspaper based in New York City with worldwide influence and readership. Founded in 1851, the paper has won 125 Pulitzer Prizes, more than any other newspaper. The New York Times is ranked 17th in the world by circulation."
    },
    links: {
      about: "https://www.nytco.com/who-we-are/",
      people:
        "https://en.wikipedia.org/wiki/List_of_The_New_York_Times_employees"
    },
    parent: {
      name: "The New York Times Company",
      link: "https://www.nytco.com/"
    },
    storySubmit: "https://www.nytimes.com/tips",
    inception: -3732782400000,
    press: "https://www.nytco.com/contact-us/",
    twitter: "@nytimes"
  },
  {
    name: "thenewyorker",
    image: "thenewyorker-logo.png",
    url: "https://www.newyorker.com/",
    file: "thenewyorker",
    title: "The New Yorker",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.newyorker.com/feed/news/news-desk"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://www.newyorker.com/feed/news/daily-comment"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_New_Yorker",
      summary:
        "The New Yorker is an American magazine of reportage, commentary, criticism, essays, fiction, satire, cartoons, and poetry. It is published by Condé Nast. Started as a weekly in 1925, the magazine is now published 47 times annually, with five of these issues covering two-week spans."
    },
    links: {
      about: "https://www.newyorker.com/about/us",
      people: "https://www.newyorker.com/contributors"
    },
    parent: {
      name: "Advance Publications",
      link: "https://www.advance.com/about_us.html"
    },
    storySubmit:
      "https://www.newyorker.com/news/news-desk/how-to-submit-sensitive-tips-and-information-to-the-new-yorker",
    inception: -1415620800000,
    press: "https://www.newyorker.com/about/press",
    twitter: "@NewYorker"
  },
  {
    name: "huffpo",
    image: "huffpo-logo.png",
    url: "https://www.huffingtonpost.com/",
    title: "The Huffington Post",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.huffingtonpost.com/section/politics/feed"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://www.huffingtonpost.com/section/opinion/feed"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/HuffPost",
      summary:
        "HuffPost (formerly The Huffington Post and sometimes abbreviated HuffPo) is an American news and opinion website and blog that has localized and international editions. It was founded in 2005 by Andrew Breitbart, Arianna Huffington, Kenneth Lerer, and Jonah Peretti. The site offers news, satire, blogs, and original content and covers politics, business, entertainment, environment, technology, popular media, lifestyle, culture, comedy, healthy living, women's interests, and local news."
    },
    links: {
      about: "https://www.huffingtonpost.com/static/about-us",
      people: "https://www.huffingtonpost.com/static/about-us"
    },
    parent: {
      name: "Oath Inc. (Verizon)",
      link: "https://www.oath.com/#home"
    },
    storySubmit: "https://img.huffingtonpost.com/securedrop",
    inception: 1115640000000,
    press: "https://www.huffingtonpost.com/static/contact-us",
    twitter: "@HuffPost"
  },
  {
    name: "guardian",
    image: "guardian-logo.png",
    url: "https://www.theguardian.com/us",
    title: "The Guardian",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.theguardian.com/world/rss"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://www.theguardian.com/us/commentisfree/rss"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Guardian",
      summary:
        'The Guardian is a British daily newspaper. It was known from 1821 until 1959 as the Manchester Guardian. Along with its sister papers The Observer and the Guardian Weekly, The Guardian is part of the Guardian Media Group, owned by the Scott Trust. The Trust was created in 1936 "to secure the financial and editorial independence of the Guardian in perpetuity and to safeguard the journalistic freedom and liberal values of the Guardian free from commercial or political interference." The Scott Trust was converted into a limited company in 2008, with a constitution written so as to project the same protections for the Guardian as were originally built into the very structure of the Trust by its creators. Profits are reinvested in journalism rather than to benefit an owner or shareholders.'
    },
    links: {
      about: "https://www.theguardian.com/info/about-guardian-us",
      people: "https://www.theguardian.com/index/contributors"
    },
    parent: {
      name: "Guardian Media Group",
      link:
        "https://www.theguardian.com/gmg/2018/jul/24/about-guardian-media-group"
    },
    storySubmit: "https://witness.theguardian.com/assignment/submitastory",
    inception: -4691217600000,
    press: "https://www.theguardian.com/gnm-press-office",
    twitter: "@guardian"
  },
  {
    name: "wsj",
    image: "wsj-logo.png",
    url: "https://www.wsj.com/",
    title: "The Wall Street Journal",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.wsj.com/xml/rss/3_7085.xml"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://www.wsj.com/xml/rss/3_7041.xml"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Wall_Street_Journal",
      summary:
        "The Wall Street Journal is a U.S. business-focused, English-language international daily newspaper based in New York City. The Journal, along with its Asian and European editions, is published six days a week by Dow Jones & Company, a division of News Corp. The newspaper is published in the broadsheet format and online."
    },
    links: {
      about: "https://www.dowjones.com/products/wsj/",
      people: ""
    },
    parent: {
      name: "Dow Jones & Company (News Corp)",
      link: "https://newscorp.com/business/dow-jones/"
    },
    storySubmit: "https://www.wsj.com/tips",
    inception: -2539771200000,
    press: "https://customercenter.wsj.com/contact",
    twitter: "@WSJ"
  },
  {
    name: "abcnews",
    image: "abcnews-logo.png",
    url: "https://abcnews.go.com/",
    title: "ABC News",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://abcnews.go.com/abcnews/politicsheadlines"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/ABC_News",
      summary:
        "ABC News is the news division of the American Broadcasting Company (ABC), owned by the Disney Media Networks division of The Walt Disney Company. Its flagship program is the daily evening newscast ABC World News Tonight with David Muir; other programs include morning news-talk show Good Morning America, newsmagazine series Nightline, Primetime and 20/20, and Sunday morning political affairs program This Week with George Stephanopoulos."
    },
    links: {
      about: "",
      people: "https://abcnews.go.com/Author"
    },
    parent: {
      name: "Disney–ABC Television Group",
      link: "https://www.disneyabcpress.com/disneyabctv/"
    },
    storySubmit: "https://abcnews.go.com/Blotter/Swimming/mailform?id=10294723",
    inception: -774619200000,
    press: "https://www.disneyabcpress.com/abc/contacts/",
    twitter: "@ABC"
  },
  {
    name: "bbcnews",
    image: "bbcnews-logo.jpg",
    url: "https://www.bbc.com/",
    title: "BBC News",
    rss: [
      {
        category: "politics",
        type: "scrape",
        url: "https://www.bbc.com/"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/BBC_News",
      summary:
        "BBC News is an operational business division of the British Broadcasting Corporation (BBC) responsible for the gathering and broadcasting of news and current affairs. The department is the world's largest broadcast news organisation and generates about 120 hours of radio and television output each day, as well as online news coverage. The service maintains 50 foreign news bureaus with more than 250 correspondents around the world. James Harding has been Director of News and Current Affairs since April 2013."
    },
    links: {
      about: "",
      people:
        "https://en.wikipedia.org/wiki/List_of_BBC_newsreaders_and_reporters"
    },
    parent: {
      name: "BBC",
      link: "https://en.wikipedia.org/wiki/BBC"
    },
    storySubmit: "https://www.bbc.com/news/10725415",
    inception: -1487332800000,
    press: "https://www.bbc.co.uk/mediacentre/contacts/press-office",
    twitter: "@BBCBreaking"
  },
  {
    name: "usatoday",
    image: "usatoday-logo.png",
    url: "https://www.usatoday.com/",
    title: "USA Today",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "http://rssfeeds.usatoday.com/UsatodaycomWashington-TopStories"
      },
      {
        category: "opinion",
        type: "rss",
        url: "http://rssfeeds.usatoday.com/News-Opinion"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/USA_Today",
      summary:
        "USA Today is an internationally distributed American daily, middle-market newspaper that serves as the flagship publication of its owner, the Gannett Company. The newspaper has a generally centrist audience. Founded by Al Neuharth on September 15, 1982, it operates from Gannett's corporate headquarters on Jones Branch Drive, in McLean, Virginia. It is printed at 37 sites across the United States and at five additional sites internationally. Its dynamic design influenced the style of local, regional, and national newspapers worldwide, through its use of concise reports, colorized images, informational graphics, and inclusion of popular culture stories, among other distinct features."
    },
    links: {
      about: "https://marketing.usatoday.com/about",
      people: "https://www.usatoday.com/reporters/"
    },
    parent: {
      name: "Gannett Company",
      link: "https://www.gannett.com/"
    },
    storySubmit: "https://newstips.usatoday.com/",
    inception: 400939200000,
    press: "https://www.usatoday.com/contactus/",
    twitter: "@USATODAY"
  },
  {
    name: "latimes",
    image: "latimes-logo.png",
    url: "https://www.latimes.com/",
    title: "Los Angeles Times",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.latimes.com/nation/politics/rss2.0.xml"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://www.latimes.com/opinion/op-ed/rss2.0.xml"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Los_Angeles_Times",
      summary:
        "The Los Angeles Times is a daily newspaper which has been published in Los Angeles, California, since 1881. It has the fourth-largest circulation among United States newspapers, and is the largest U.S. newspaper not headquartered on the east coast. The paper is known for its coverage of issues particularly salient to the U.S. west coast, such as immigration trends and natural disasters. It has won more than 40 Pulitzer Prizes for its coverage of these and other issues. As of June 18, 2018, ownership of the paper is controlled by Patrick Soon-Shiong, and the executive editor is Norman Pearlstine."
    },
    links: {
      about: "http://www.latimes.com/about/la-about-us-storygallery.html",
      people:
        "http://www.latimes.com/about/la-editorial-staff-directory-htmlstory.html"
    },
    parent: {
      name: "Patrick Soon-Shiong (Los Angeles Times Communications LLC)",
      link: "https://en.wikipedia.org/wiki/Patrick_Soon-Shiong"
    },
    storySubmit: "http://www.latimes.com/about/la-contact-us-htmlstory.html",
    inception: 0,
    press: "http://www.latimes.com/about/la-contact-us-htmlstory.html",
    twitter: "@latimes"
  },
  {
    name: "cbsnews",
    image: "cbsnews-logo.png",
    url: "https://www.cbsnews.com/",
    title: "CBS News",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.cbsnews.com/latest/rss/politics"
      }
      // {
      //   category: "opinion",
      //   type: "rss",
      //   url: "https://www.cbsnews.com/latest/rss/opinion"
      // }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/CBS_News",
      summary:
        "CBS News is the news division of American television and radio service CBS. The president of CBS News is David Rhodes. CBS News' broadcasts include the CBS Evening News, CBS This Morning, news magazine programs CBS Sunday Morning, 60 Minutes and 48 Hours, and Sunday morning political affairs program Face the Nation. CBS News Radio produces hourly newscasts for hundreds of radio stations, and also oversees CBS News podcasts like The Takeout Podcast. CBS News also operates a 24-hour digital news network called CBSN."
    },
    links: {
      about: "https://www.cbscorporation.com/business/cbs-news/",
      people: "https://www.cbsnews.com/team/"
    },
    parent: {
      name: "CBS Corporation",
      link: "https://www.cbscorporation.com/"
    },
    storySubmit:
      "https://www.cbsnews.com/news/have-a-story-idea-for-sunday-morning/",
    inception: -1334491200000,
    press: "https://www.cbspressexpress.com/cbs-entertainment/contacts",
    twitter: "@CBSNews"
  },
  {
    name: "reuters",
    image: "reuters-logo.png",
    url: "https://www.reuters.com/",
    title: "Reuters",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "http://feeds.reuters.com/Reuters/PoliticsNews"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Reuters",
      summary:
        "Reuters is an international news agency headquartered in London, United Kingdom. It is a division of Thomson Reuters. Until 2008, the Reuters news agency formed part of an independent company, Reuters Group plc, which was also a provider of financial market data. Since the acquisition of Reuters Group by the Thomson Corporation in 2008, the Reuters news agency has been a part of Thomson Reuters, making up the media division. Reuters transmits news in English, French, German, Italian, Spanish, Portuguese, Russian, Urdu, Arabic, Japanese, Korean, and Chinese. It was established in 1851."
    },
    links: {
      about:
        "https://agency.reuters.com/en.html?utm_source=website&utm_medium=reuters&utm_campaign=site-referral&utm_content=us&utm_term=0",
      people: "https://www.reuters.com/journalists/reuters-staff"
    },
    parent: {
      name: "Thomson Reuters",
      link: "https://www.thomsonreuters.com/en.html"
    },
    storySubmit: "https://www.reuters.com/investigates/special-report/tips/",
    inception: -3731659200000,
    press: "https://www.thomsonreuters.com/en/contact-us/media-contacts.html",
    twitter: "@Reuters"
  },
  {
    name: "time",
    image: "time-logo.png",
    url: "https://time.com/",
    title: "Time",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://feeds.feedburner.com/timeblogs/swampland"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://feeds.feedburner.com/time/ideas"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Time_(magazine)",
      summary:
        "Time is an American weekly news magazine and news website published in New York City. It was founded in 1923 and originally run by Henry Luce. A European edition (Time Europe, formerly known as Time Atlantic) is published in London and also covers the Middle East, Africa and, since 2003, Latin America. An Asian edition (Time Asia) is based in Hong Kong. The South Pacific edition, which covers Australia, New Zealand and the Pacific Islands, is based in Sydney. In December 2008, Time discontinued publishing a Canadian advertiser edition."
    },
    links: {
      about: "https://subs.time.com/about-time/",
      people: "https://www.timemediakit.com/bios/"
    },
    parent: {
      name: "Time Inc.",
      link: "https://en.wikipedia.org/wiki/Time_Inc."
    },
    storySubmit: "http://ideas.time.com/submit-a-letter/",
    inception: -1477915200000,
    press: "https://www.timemediakit.com/media/",
    twitter: "@TIME"
  },
  {
    name: "nationalreview",
    image: "nationalreview-logo.png",
    url: "https://www.nationalreview.com/",
    title: "National Review",
    rss: [
      {
        category: "opinion",
        type: "rss",
        url: "https://www.nationalreview.com/feed/"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/National_Review",
      summary:
        "National Review (NR) is an American semi-monthly conservative editorial magazine focusing on news and commentary pieces on political, social, and cultural affairs. The magazine was founded by the author William F. Buckley Jr. in 1955. It is currently edited by Rich Lowry."
    },
    links: {
      about: "https://www.nationalreview.com/frequently-asked-questions/",
      people: "https://www.nationalreview.com/the-masthead/"
    },
    parent: {
      name: "National Review, Inc.",
      link: "https://www.nationalreview.com/frequently-asked-questions/"
    },
    storySubmit: "https://www.nationalreview.com/contact-us/",
    inception: -445521600000,
    press: "https://www.nationalreview.com/contact-us/",
    twitter: "@NRO"
  },
  {
    name: "theatlantic",
    image: "theatlantic-logo.png",
    url: "https://www.theatlantic.com/",
    title: "The Atlantic",
    rss: [
      {
        category: "opinion",
        type: "rss",
        url: "https://www.theatlantic.com/feed/channel/politics/"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Atlantic",
      summary:
        "The Atlantic is an American magazine and multi-platform publisher.\n" +
        "\n" +
        "It was founded in 1857 as The Atlantic Monthly in Boston, Massachusetts, and began as a literary and cultural commentary magazine publishing leading writers' commentary on abolition, education, and other major issues in contemporary political affairs. Its founders included Francis H. Underwood, along with prominent writers Ralph Waldo Emerson, Oliver Wendell Holmes, Sr., Henry Wadsworth Longfellow, Harriet Beecher Stowe, and John Greenleaf Whittier. James Russell Lowell was its first editor."
    },
    links: {
      about: "https://www.theatlantic.com/history/",
      people: "https://www.theatlantic.com/masthead/"
    },
    parent: {
      name: "Emerson Collective",
      link: "http://www.emersoncollective.com/"
    },
    storySubmit: "https://www.theatlantic.com/tips/",
    inception: -3539592000000,
    press: "https://www.theatlantic.com/contact/",
    twitter: "@TheAtlantic"
  },
  {
    name: "vox",
    image: "vox-logo.png",
    url: "https://www.vox.com/",
    title: "Vox",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.vox.com/rss/index.xml"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Vox_(website)",
      summary:
        "Vox is an American news and opinion website owned by Vox Media. The website was founded in 2014 by Melissa Bell, Matthew Yglesias, and Ezra Klein. Noted for its concept of explanatory journalism, Vox takes a liberal-leaning editorial stance."
    },
    links: {
      about: "https://www.vox.com/pages/about-us",
      people: "https://www.vox.com/masthead"
    },
    parent: {
      name: "Vox Media",
      link: "https://www.voxmedia.com/a/go-deeper/about"
    },
    storySubmit: "https://www.vox.com/contact#tip",
    inception: 1396785600000,
    press: "https://www.vox.com/contact",
    twitter: "@voxdotcom"
  },
  {
    name: "washingtontimes",
    image: "washingtontimes-logo.png",
    url: "https://www.washingtontimes.com/",
    title: "The Washington Times",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.washingtontimes.com/rss/headlines/news/politics/"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://www.washingtontimes.com/rss/headlines/opinion/"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Washington_Times",
      summary:
        "The Washington Times is an American conservative daily newspaper that covers general interest topics with a particular emphasis on American politics. The paper is published as a broadsheet at 3600 New York Avenue NE, Washington, D.C."
    },
    links: {
      about: "https://www.washingtontimes.com/about/",
      people: "https://www.washingtontimes.com/contact-us/"
    },
    parent: {
      name: "Operations Holdings (via The Washington Times, LLC)",
      link: "http://www.operationsholdings.com/"
    },
    storySubmit: "https://www.washingtontimes.com/contact-us/",
    inception: 390484800000,
    press: "https://www.washingtontimes.com/contact-us/",
    twitter: "@WashTimes"
  },
  {
    name: "washingtonexaminer",
    image: "washingtonexaminer-logo.png",
    url: "https://www.washingtonexaminer.com/",
    title: "The Washington Examiner",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.washingtonexaminer.com/tag/politics.rss"
      },
      {
        category: "opinion",
        type: "rss",
        url: "https://www.washingtonexaminer.com/tag/opinion.rss"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Washington_Examiner",
      summary:
        "The Washington Examiner is an American political journalism website and weekly magazine based in Washington, D.C. that covers politics and policy in the United States and internationally. It is owned by MediaDC, a subsidiary of Clarity Media Group, which is owned by Philip Anschutz.\n"
    },
    links: {
      about: "https://www.washingtonexaminer.com/about",
      people: "https://www.washingtonexaminer.com/staff"
    },
    parent: {
      name: "Clarity Media Group",
      link: "https://www.claritymediagroup.com/"
    },
    storySubmit: "https://www.washingtonexaminer.com/contact",
    inception: 1104580800000,
    press: "https://www.washingtonexaminer.com/contact",
    twitter: "@dcexaminer"
  },
  {
    name: "newrepublic",
    image: "newrepublic-logo.jpg",
    url: "https://newrepublic.com/",
    title: "The New Republic",
    rss: [
      {
        category: "opinion",
        type: "rss",
        url: "https://newrepublic.com/rss.xml"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_New_Republic",
      summary:
        'The New Republic is a liberal American magazine of commentary on politics and the arts, published since 1914, with influence on American political and cultural thinking. Founded in 1914 by leaders of the progressive movement, it attempted to find a balance between a humanitarian progressivism and an intellectual scientism, ultimately discarding the latter. Through the 1980s and \'90s, the magazine incorporated elements of "Third Way" neoliberalism and conservatism.'
    },
    links: {
      about: "https://newrepublic.com/pages/about",
      people: "https://newrepublic.com/pages/people"
    },
    parent: {
      name: "",
      link: ""
    },
    storySubmit: "https://newrepublic.com/pages/contact",
    inception: -1740398400000,
    press: "https://newrepublic.com/pages/contact",
    twitter: "@newrepublic"
  },
  {
    name: "thewashingtonpost",
    image: "thewashingtonpost-logo.png",
    url: "https://www.washingtonpost.com/",
    title: "The Washington Post",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "http://feeds.washingtonpost.com/rss/politics"
      },
      {
        category: "opinion",
        type: "rss",
        url: "http://feeds.washingtonpost.com/rss/opinions"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Washington_Post",
      summary:
        'The Washington Post is a major American daily newspaper founded on December 6, 1877. It is the largest newspaper published in Washington, D.C., the capital city of the United States, and has a particular emphasis on national politics. Its slogan "Democracy Dies in Darkness" appears on its masthead. Daily broadsheet editions are printed for the District of Columbia, Maryland, and Virginia.'
    },
    links: {
      about: "",
      people: ""
    },
    parent: {
      name: "Nash Holdings",
      link: "https://en.wikipedia.org/wiki/Jeff_Bezos#The_Washington_Post"
    },
    storySubmit:
      "https://helpcenter.washingtonpost.com/hc/en-us/sections/207384087-Contact-the-Newsroom",
    inception: 536500800000,
    press: "https://helpcenter.washingtonpost.com/hc/en-us",
    twitter: "@washingtonpost"
  },
  {
    name: "newyorkpost",
    image: "newyorkpost-logo.png",
    url: "https://nypost.com/",
    title: "New York Post",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://nypost.com/news/feed/"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/New_York_Post",
      summary:
        "The New York Post is a daily newspaper in New York City. The Post also operates the celebrity gossip site PageSix.com, the entertainment site Decider.com, and co-produces the television show Page Six TV."
    },
    links: {
      about: "https://newscorp.com/business/new-york-post/",
      people: "https://nypost.com/contact/"
    },
    parent: {
      name: "News Corp",
      link: "https://newscorp.com/"
    },
    storySubmit: "https://nypost.com/tips/",
    inception: -5305521600000,
    press:
      "http://advertising.nypost.com/?_ga=2.34738081.100750250.1535983646-1028308451.1527209598",
    twitter: "@nypost"
  },
  {
    name: "theintercept",
    image: "theintercept-logo.png",
    url: "https://theintercept.com/",
    title: "The Intercept",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://theintercept.com/feed/?lang=en"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Intercept",
      summary:
        'The Intercept is an online news publication dedicated to what it describes as "adversarial journalism". It is supported financially by First Look Media. Its editors are Betsy Reed, Glenn Greenwald, and Jeremy Scahill. Former editor Laura Poitras left the publication to work on non-fiction films. The Intercept also publishes two podcasts: Intercepted hosted by Scahill and Deconstructed hosted by Mehdi Hasan.\n'
    },
    links: {
      about: "https://theintercept.com/about/",
      people: "https://theintercept.com/about/"
    },
    parent: {
      name: "First Look Media",
      link: "https://firstlook.media/"
    },
    storySubmit: "https://theintercept.com/source/",
    inception: 1391256000000,
    press: "https://theintercept.com/about/",
    twitter: "@theintercept"
  },
  {
    name: "motherjones",
    image: "motherjones-logo.png",
    url: "https://www.motherjones.com/",
    title: "Mother Jones",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "http://feeds.feedburner.com/motherjones/feed"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Mother_Jones_(magazine)",
      summary:
        "Mother Jones (abbreviated MoJo) is a progressive American magazine that focuses on news, commentary, and investigative reporting on topics including politics, the environment, human rights, and culture. Clara Jeffery serves as editor. Steve Katz has been publisher since 2010. Monika Bauerlein has been CEO since 2015. Mother Jones is published by The Foundation for National Progress."
    },
    links: {
      about: "https://www.motherjones.com/about/",
      people: "https://www.motherjones.com/about/staff/"
    },
    parent: {
      name: "Foundation for National Progress",
      link: "https://www.macfound.org/grantees/2464/"
    },
    storySubmit: "https://www.motherjones.com/contact/",
    inception: 192024000000,
    press: "https://www.motherjones.com/contact/",
    twitter: "@MotherJones"
  }
];

let old = [
  {
    name: "bloomberg",
    image: "bloomberg-logo.png",
    url: "https://www.bloomberg.com/",
    file: "bloomberg",
    title: "Bloomberg",
    rss: [
      {
        category: "politics",
        type: "scrape",
        url: "https://www.bloomberg.com/politics"
      },
      {
        category: "opinion",
        type: "scrape",
        url: "https://www.bloomberg.com/opinion"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Bloomberg_News",
      summary:
        "Bloomberg News is an international news agency headquartered in New York, United States and a division of Bloomberg L.P. Content produced by Bloomberg News is disseminated through Bloomberg Terminals, Bloomberg Television, Bloomberg Radio, Bloomberg Businessweek, Bloomberg Markets, Bloomberg.com and Bloomberg's mobile platforms. Since 2015, John Micklethwait has served as editor-in-chief."
    },
    links: {
      about: "https://www.bloomberg.com/company/",
      people: "https://www.bloomberg.com/view/contributors"
    },
    parent: {
      name: "Bloomberg L.P.",
      link: "https://en.wikipedia.org/wiki/Bloomberg_L.P."
    },
    storySubmit: "https://www.bloomberg.com/tips/",
    inception: 631195200000,
    press:
      "https://www.bloomberg.com/company/press-contacts/?utm_source=bloomberg-menu&utm_medium=blp",
    twitter: "@business"
  },
  {
    name: "politico",
    image: "politico-logo.png",
    url: "https://www.politico.com/",
    title: "Politico",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://www.politico.com/rss/politics08.xml"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/Politico",
      summary:
        "Politico, known earlier as The Politico, is an American political journalism company based in Arlington County, Virginia, that covers politics and policy in the United States and internationally. It distributes content through its website, television, physical newspapers, radio, and podcasts. Its coverage in Washington, D.C., includes the U.S. Congress, lobbying, media and the presidency."
    },
    links: {
      about: "https://www.politico.com/about-us",
      people: "https://www.politico.com/about-us"
    },
    parent: {
      name: "Capitol News Company",
      link: "https://en.wikipedia.org/wiki/Capitol_News_Company"
    },
    storySubmit: "https://www.politico.com/news-tips/",
    inception: 1169553600000,
    press: "https://www.politico.com/contact-us",
    twitter: "@politico"
  },
  {
    name: "dailybeast",
    image: "dailybeast-logo.jpg",
    url: "https://www.thedailybeast.com/",
    title: "The Daily Beast",
    rss: [
      {
        category: "politics",
        type: "rss",
        url: "https://feeds.thedailybeast.com/rss/articles"
      }
    ],
    wikipedia: {
      link: "https://en.wikipedia.org/wiki/The_Daily_Beast",
      summary:
        'The Daily Beast is an American news and opinion website focused on politics and pop culture. In a 2015 interview, former editor-in-chief John Avlon described The Beast\'s editorial approach: "We seek out scoops, scandals, and stories about secret worlds; we love confronting bullies, bigots, and hypocrites." In 2018 Avlon described the Beast\'s "Strike Zone" as “politics, pop culture and power.'
    },
    links: {
      about: "https://www.thedailybeast.com/company/about-us",
      people: "https://www.thedailybeast.com/company/about-us"
    },
    parent: {
      name: "IAC (InterActiveCorp)",
      link: "http://www.iac.com/"
    },
    storySubmit: "https://www.thedailybeast.com/tips",
    inception: 1223294400000,
    press: "https://www.thedailybeast.com/company/contact-us",
    twitter: "@thedailybeast"
  }
];
