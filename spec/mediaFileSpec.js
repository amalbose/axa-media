const path = require('path')
const {MediaFile} = require('../src/js/mediafile.js')

describe ('MediaFile Test Suite', ()=> {
    var dummyPath = __dirname
    var med = new MediaFile(dummyPath)

    const map = new Map([
        [ '100 Days of Love (2015) - Malayalam - DVDRip - X264 - AC3 - Ch3 @ ZippyMovieZ.mp4', '100 Days of Love' ],
        [ '28.Days.Later.2002.720p.BrRip.264.YIFY.mp4', '28 Days Later' ],
        [ 'Aladdin.1992.720p.BRrip.x264.GAZ.YIFY.mp4', 'Aladdin' ],
        ['Anniyan(2005)Tamil DVDRip Xvid@Mastitorrents.avi','Anniyan'],
        ['Batman.1989.720p.BRrip.x264.YIFY.mp4','Batman'],
        ['Batman.The.Dark.Knight.Returns.Part.1.2012.720p.BRrip.x264.YIFY.mp4','Batman The Dark Knight Returns Part 1'],
        ['Batman.The.Dark.Knight.Part.2.2013.720p.BRrip.x264.GAZ.YIFY.mp4','Batman The Dark Knight Part 2'],
        ['Batman.The.Killing.Joke.2016.720p.BluRay.x264-[YTS.AG],.mp4','Batman The Killing Joke'],
        ['Batman.Under.The.Red.Hood.2010.1080p.BRrip.x264.YIFY.mp4','Batman Under The Red Hood'],
        ['Batman.Year.One.x264.720p.YIFY.mp4','Batman Year One'],
        ['Boyhood.2014.720p.BluRay.x264.YIFY.mp4','Boyhood'],
        ['Cloverfield[2008]DvDrip.AC3[Eng]-aXXo.avi','Cloverfield'],
        ['Dawn.of.the.Planet.of.the.Apes.2014.720p.BluRay.x264.YIFY.mp4','Dawn of the Planet of the Apes'],
        ['Don.Jon.2013.720p.BluRay.x264.YIFY.mp4','Don Jon'],
        ['Drive.2011.SCR.XviD-playXD.avi','Drive'],
        ['Drive.2011.SCR.XviD-playXD.sample.avi','Drive'],
        ['Hail.Caesar.2016.HC.HDRip.XViD.AC3-ETRG.avi','Hail Caesar'],
        ['sample.avi','sample'],
        ['Indiana.Jones.And.The.Raiders.Of.The.Lost.Ark.1981.1080p.BluRay.x264.YIFY.mp4','Indiana Jones And The Raiders Of The Lost Ark'],
        ['Inside.Out.2015.720p.BluRay.x264.YIFY.mp4','Inside Out'],
        ['Insidious.2010.720p.BrRip.x264.YIFY.mp4','Insidious'],
        ['John.Wick.2014.720p.BluRay.x264-[YTS.AG].mp4','John Wick'],
        ['Kingsman.The.Secret.Service.2014.1080p.BluRay.x264.YIFY.mp4','Kingsman The Secret Service'],
        ['Diabolique.avi','Diabolique'],
        ['Locke.2013.720p.BluRay.x264.YIFY.mp4','Locke'],
        ['Macbeth.1971.720p.BluRay.x264.YIFY.mp4','Macbeth'],
        ['Macbeth.2015.720p.BluRay.x264-[YTS.AG].mp4','Macbeth'],
        ['Manglish (2014) 720p Malayalam DVDRip x264 E-Subs Team DDH~RG.mp4','Manglish'], 
        ['Mary.and.Max.2009.720p.BrRip.x264.BOKUTOX.YIFY.mp4','Mary and Max'],
        ['Mission.Impossible.Rogue.Nation.2015.HDRip.XViD.Ac3-ETRG.avi','Mission Impossible Rogue Nation'],
        ['Monsters.Inc.2001.720p.BluRay.x264.YIFY.mp4','Monsters Inc'],
        ['Monsters.University.2013.720p.BluRay.x264.YIFY.mp4','Monsters University'],
        ['Nadodikattu - Full Movie - Malayalam.mp4','Nadodikattu   Full Movie   Malayalam'],
        ['Njan_Gandharvan_1991_padmarajan.avi','Njan Gandharvan'],
        ['Now.You.See.Me.2.2016.BDRip.XviD.AC3-EVO.avi','Now You See Me 2'],
        ['sample.avi','sample'],
        ['Odaruthammava Aalariyaam - Malayalam Comedy Movies - Malayalam Full Movie New Releases.mp4','Odaruthammava Aalariyaam   Malayalam Comedy Movies   Malayalam Full Movie New Releases'],
        ['Regression.2015.720p.BluRay.x264-[YTS.AG].mp4','Regression'],
        ['The Tenant.1976.avi','The Tenant'],
        ['Sherlock.The.Abominable.Bride.2016.720p.BluRay.x264.VPPV.mp4','Sherlock The Abominable Bride'],
        ['pme-shutter.avi','pme shutter'],
        ['Sample.avi','Sample'],
        ['Shutter.[2008.Eng].DVDRip.DivX-LTT.avi','Shutter'],
        ['Slow.West.2015.720p.BluRay.x264.YIFY.mp4','Slow West'],
        ['Spectre.2015.720p.BRRip.x264.AAC-ETRG.mp4','Spectre'],
        ['ETRG.mp4','ETRG'],
        ['SaMple.avi','SaMple'],
        ['Spy.2015.HDRip.XviD-ETRG.avi','Spy'],
        ['SaMple.avi','SaMple'],
        ['Star.Wars.Episode.VII.The.Force.Awakens.2015.BRRip.XviD-ETRG.avi','Star Wars Episode VII The Force Awakens'],
        ['Tell.No.One.2006.720p.BluRay.x264.anoXmous_.mp4','Tell No One'],
        ['Terminator.4.Salvation.2009.DC.720p.BluRay.YIFY.mp4','Terminator 4 Salvation'],
        ['The.Babadook.2014.1080p.BluRay.x264.YIFY.mp4','The Babadook'],
        ['The.Conjuring.2013.720p.BluRay.x264.YIFY.mp4','The Conjuring'],
        ['The.Game.1997.720p.BluRay.x264.YIFY.mp4','The Game'],
        ['The.Great.Train.Robbery.1978.720p.BluRay.x264.YIFY.mp4','The Great Train Robbery'],
        ['The.Nice.Guys.2016.720p.BluRay.x264-[YTS.AG],.mp4','The Nice Guys'],
        ['The.Birds.1963.720p.BluRay.x264.AAC-ETRG.mp4','The Birds'],
        ['RARBG.COM.mp4','RARBG COM'],
        ['The.Cable.Guy.1996.720p.BluRay.H264.AAC-RARBG.mp4','The Cable Guy'],
        ['The.Good.Dinosaur.2015.HDRip.XviD.AC3-EVO.avi','The Good Dinosaur'],
        ['sample.avi','sample'],
        ['The.Hateful.Eight.2015.DVDScr.XVID.AC3.HQ.Hive-CM8.avi','The Hateful Eight'],
        ['sample.avi','sample'],
        ['The.Man.from.U.N.C.L.E.2015.HDRip.XViD-ETRG.avi','The Man from U N C L E'],
        ['The.Orphanage[El.Orfanato][2007]DvDrip[Eng.Hard.Subs],-aXXo.avi','The.Orphanage[El.Orfanato]'],
        ['Time.Lapse.2014.720p.BluRay.x264.YIFY.mp4','Time Lapse'],
        ['To.Kill.a.Mockingbird.1962.720p.BrRip.264.YIFY.mp4','To Kill a Mockingbird'],
        ['Unbreakable.2000.720p.BrRip.x264.YIFY.mp4','Unbreakable'],
        ['Victor.Frankenstein.2015.720p.BluRay.x264-[YTS.AG],.mp4','Victor Frankenstein'],
        ['X-Men.Days.of.Future.Past.2014.THE.ROGUE.CUT.BRRip.XviD.AC3-EVO.avi','X-Men Days of Future Past'],
        ['usthadhoteldvdrip.shakir69.avi','usthadhoteldvdrip shakir69'],
        ['ETRG.mp4','ETRG'],
        ['X.Men.Apocalypse.2016.TC.x264.AAC-ETRG.mp4','X Men Apocalypse'],
        ['sample.mp4','sample']
    ]);

    it('MediaFile objects is proper', ()=>{
        expect(med).toBeDefined();
    });

    it('MediaFile variables are correctly calculated', ()=>{
        expect(med.absPath).toBeDefined();
        expect(med.isValidFile).toEqual(true);
        expect(med.absPath).toEqual(dummyPath);
        expect(med.parent).toEqual(path.resolve(dummyPath,'..'));
        expect(med.fileName).toEqual('spec');
    });

    it('Clean File Name Test', ()=>{
        for (const [key, value] of map.entries()) {
            expect(med.cleanFileName(key)).toEqual(value);
        }
    });
});