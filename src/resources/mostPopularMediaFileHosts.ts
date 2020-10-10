/**
 * The following domains are hosting the most podcast episodes as of 2020-10-09.
 * Special thanks to Michael Kelley at podcastranking.com for sharing this data!
 * 
 * https://podcastranking.com/
 * 
 * This information is used in the Podverse web app to dynamically replace
 * http values with https to prevent mixed content warnings/errors in the browser.
 * 
 * Sometimes the mp3 URL provided by podcasters uses the http protocol,
 * but https is actually available on that domain. We are assuming that
 * the most popular media file hosts also support https.
 */
export const mostPopularMediaFileHosts = [
  "anchor.fm",
  "traffic.libsyn.com",
  "feeds.soundcloud.com",
  "mcdn.podbean.com",
  "api.spreaker.com",
  "www.buzzsprout.com",
  "feedproxy.google.com",
  "chtbl.com",
  "media.blubrry.com",
  "dts.podtrac.com",
  "media.blubrry.com",
  "static1.squarespace.com",
  "traffic.omny.fm",
  "api.spreaker.com",
  "www.blogtalkradio.com",
  "pdcn.co",
  "t.subsplash.com",
  "itunesu-assets.itunes.apple.com",
  "jt.ximalaya.com",
  "clovermedia.s3-us-west-2.amazonaws.com",
  "traffic.libsyn.com",
  "cdn.simplecast.com",
  "audioboom.com",
  "file-ex.ssenhosting.com",
  "sphinx.acast.com",
  "www.podtrac.com",
  "www.podtrac.com",
  "dts.podtrac.com",
  "podcastdownload.faithcomesbyhearing.com",
  "traffic.megaphone.fm",
  "www.ivoox.com",
  "cdn.lizhi.fm",
  "cdn.podigee.com",
  "feeds.soundcloud.com",
  "www.ivoox.com",
  "mp3.sermonaudio.com",
  "www.archive.org",
  "media.transistor.fm",
  "rss.art19.com",
  "feeds.acast.com",
  "media.whooshkaa.com",
  "www.csmedia1.com",
  "podcasts.captivate.fm",
  "pinecast.com"
]
