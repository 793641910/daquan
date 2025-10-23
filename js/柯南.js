/*!
 * Copyright © 2025 Taoist
 * Licensed under LGPL3 (https://github.com/hjdhnx/drpy-node/blob/main/LICENSE)
 */
/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 1,
  title: '柯南影视',
  author: '/25/',
  '类型': '影视',
  lang: 'dr2'
})
*/

globalThis.cleanVerificationCode = function(text) {
    let replacements = {
        'y': '9',
        '口': '0',
        'q': '0',
        'u': '0',
        'o': '0',
        '>': '1',
        'd': '0',
        'b': '8',
        '已': '2',
        'D': '0',
        '五': '5',
        '066': '1666',
        '566': '5066'
    };
    if (text.length === 3) {
        text = text.replace('566', '5066').replace('066', '1666');
    }
    return text.split('').map(char =>
        replacements[char] || char
    ).join('');
}

var rule = {
    author: '/25/',
    title: '柯南影视',
    类型: '影视',
    host: 'https://www.knvod.com/',
    headers: {
        "User-Agent": "MOBILE_UA",
        'X-Requested-With': 'XMLHttpReq11uest',
        'Cookie': 'X-Robots-Tag=CDN-VERIFY; PHPSESSID=1tcbd0rfj1sbehh2ho0jfiohug'
    },
    hostJs: ``,
    编码: 'utf-8',
    timeout: 5000,
    homeUrl: '/',
    url: '/show/fyclassfyfilter/',
    searchUrl: '/daxiaoren/**----------fypage---/',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 9,
    double: false,
    play_parse: true,
    class_name: '电影&电视剧&综艺&动漫&短剧',
    class_url: '1&2&4&3&6',
    filter_url: '-{{fl.area}}-{{fl.by or "time"}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2aW08bRxTHv8s+87AL5MZb7vf7PVUe3MhqoxIqAa2EIiTAmNoOsQ0igLHB0NiYIIzNRdSYYr6MZ3b9LSJ7zmVQ29U+QILovuX/O5zZOTPDnD+7eW9YRtcP741fggNGl/GmO9DXZ7QZPYF3QaPLENGCDIWNNuP3QPdvwdbP9TRxeKURWmlio8swBtuATmdEtAAUBMbsyAYMxAJjcjgph6YhBoLGjK3U9zM4phI0ZmFC7O7hmEpQbLjWmKthTAkak4piQXOJzNarUZyLEhhzistifBViIOh5sZK9jzEQWg321B7X0BQUy//BNYCguRSX67VFnIsSlDc22Uh9wTwlKG9hVUZmMU8JL2stR9bs6QmMKUGxUEyOzGFMicHXzag6N4HeYEA7NpmyGK96PTa5QiM1hqUogbHGckpWShADQUtei4v0Pi65EjTdrU8cA0Hb+GGDYyAobyYvM2uYpwTNJfuF80BQDbW/OAaC51LW51I+lPexLKrLmKcE5Y0mRK4gIrjLrKmS/IGdKNrRFBZDmo/eovxwIHL0W0mafiK8U9/DAwFC39juQM9PvLFOqeisDHncWJlabwzNOaV5LIC0thVOqchb0RS0vZs5joHQtoJjILQt5BgI7VhoMSW0LeQYCG2RxHqIF6kp9EUaCAZ6eZHkzE5jZtvjIrWb7WeAtf6p8U7mnTrvYN6h83bm7Tq3mFs6N5mbGrcuELcu6Pw88/M6P8f8nM7PMj+rc67X0uu1uF5Lr9fiei29XovrtfR6La7X0uu1uF7LPHzGg/39QW0DRXFGlj563MCLAC4SuQTkEpHLQC4TuQLkCpGrQK4SuQbkGpHrQK4TuQHkBpGbQG4SuQXkFpHbQG4TuQPkDpG7QO4SuQfkHpH7QO4TeQDkAZGHQB4SeQTkEZHHQB4TeQLkCZGnQJ4SeQbkGZHnQJ4TeQHkBZGXQF4SeQXk1aFD8eOA9hsdnxTVxD8OBP+iG11G/9t3QRqyXq3K8hREfn7b38dXXmlURLDb9b35tTfYfOrrNqP9qFxYIud8JnejhBd305iflLN5MbwjQgm8WXXkxeWJ9R1RpTtUCY8O6T9dnptDcnNyIj4mEpsYU4LmspcQ4QrORQnaut0lOY8uCAS7oLBMoR0BQc/7NMauCwQ9b3+C1wyE1wZ8TM7KzT25OR03RyYSZblbo6PXEl6clZtDcnVr02URWxTzS5hK+hu4G5He1/yCEt/L1/j+5PT5E+Im12vq9Zpcr6nXa3Jdpl6XyXWZel0m12V2+r7I90Unyxd1HJEvagxF7cIQ3q1K6H19NKv19dEsT2z9wClH8C5XgvImizKWxzwl+L4Oywp6DBB8z2/Vd5N0z7eE1pgbn3EuIChWXRXrCxhTgp6X3nSiVXyeEpQ3lZXb9KZMCcqrVGQkUa9Oihiu2SFE67D9p72HzhAEjbEx4gyPY7YS38DDyEpJJMo06ZbQ2mUjS69OlKDYWsGuxTGmxKl95+F7g9PnDfwe7ffok9SjO4+oR7v1YdevPaGis4S9HQSNGV+xkzhpEBRLLthr9MVDCbo3Xb6wOMl5J47vUUDQmItLIk13sRI0pst7Dpmpal9tlKDnHSS5O4OgPJd3OqI8IXZxk0HosfyWFstv8XrmavW/8WsPCMqLZ0UkjXlK8NHZFEX0NSBozHRMptCfgOB12RAHM7QuLaH1r+/xfsT1fcW/+QeP0/W9he8tfG/hewvfW3j0Fmc0b3FMd70YC4sM/h0Jgq7NY/hfBv+rHuF/c/d7i99b/N5y8nrL4FdzwZ3U+ygAAA==',
    推荐: '*',
    一级: 'body&&.public-list-box;a&&title;img&&data-src;.sBottom&&Text;a&&href',
    二级: $js.toString(() => {
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        let html = request(input);
        VOD = {};
        VOD.vod_id = input;
        VOD.vod_name = pdfh(html, '.slide-info-title.hide&&Text');
        VOD.type_name = pdfh(html, 'li:contains(备注)&&Text').replace('备注：', ' ');
        VOD.vod_pic = pd(html, '.detail-pic&&img&&data-src');
        VOD.vod_remarks = pdfh(html, 'li:contains(更新)&&Text').replace('更新：', ' ');
        VOD.vod_year = pdfh(html, 'li:contains(年份)&&Text').replace('年份：', ' ');
        VOD.vod_area = pdfh(html, 'li:contains(地区)&&Text').replace('地区：', ' ');
        VOD.vod_director = pdfh(html, 'li:contains(导演)&&Text').replace('导演：', ' ');
        VOD.vod_actor = pdfh(html, 'li:contains(演员)&&Text').replace('演员：', ' ');
        VOD.vod_content = '🌺关注企鹅号“别叫偶兵哥哥”🌺获取最新接口🌺加🇶|🇶793641910防迷失！➽➽➽兵哥祝您观影愉快！以下为简介:' + pdfh(html, 'li:contains(简介)&&Text').replace('简介：', ' ');
        let playform = [];
        let playurls = [];
        let tabs = pdfa(html, '.nav-swiper&&a') || [];
        let excludePattern = /超快B|线路/i;
        let priorityOrder = ["超快D", "排序2", "4K"];
        tabs.forEach((item, index) => {
            let from = pdfh(item, 'Text');
            if (!from || excludePattern.test(from)) return;
            let playTag = `.anthology-list-box:eq(${index}) a`;
            let tags = pdfa(html, playTag) || [];
            let mapUrl = tags.map((it) => {
                let title = pdfh(it, "a&&Text") || "";
                let purl = pd(it, "a&&href") || "";
                return title + "$" + purl;
            }).filter(Boolean);
            if (mapUrl.length > 0) {
                playform.push(from);
                playurls.push(mapUrl.join("#"));
            }
        });
        if (playform.length > 0) {
            let sortedPairs = playform
                .map((from, i) => ({
                    from,
                    url: playurls[i]
                }))
                .sort((a, b) => {
                    let aIdx = priorityOrder.findIndex(prefix => a.from.startsWith(prefix));
                    let bIdx = priorityOrder.findIndex(prefix => b.from.startsWith(prefix));
                    return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
                });
            playform = sortedPairs.map(p => p.from);
            playurls = sortedPairs.map(p => p.url);
        }
        VOD.vod_play_from = playform.join("$$$");
        VOD.vod_play_url = playurls.join("$$$");
        /*
        let r_ktabs = pdfa(html, '.nav-swiper&&a');
        let ktabs = r_ktabs.map(it => '' + pdfh(it, 'Text').replace("播放源", " 极速云播").replace("电影", " 高清一线"));
        VOD.vod_play_from = ktabs.join('$$$');
        let klists = [];
        let r_plists = pdfa(html, 'body&&.anthology-list-box');
        r_plists.forEach((rp) => {
            let klist = pdfa(rp, 'body&&a').reverse().map((it) => {
                return pdfh(it, 'a&&Text').replace("展开全部", "👉 ") + '$' + pd(it, 'a&&href', input);
            });
            klist = klist.join('#');
            klists.push(klist);
        });
        VOD.vod_play_url = klists.join('$$$')
        */
    }),
    搜索: $js.toString(() => {
        pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        for (var i = 0; i < 2; i++) {
            let yzm = HOST + "/index.php/verify/index.html";
            let yzmHtml = request(yzm, {
                withHeaders: true,
                toBase64: true,
                headers: rule.headers
            }, true);
            let yzmJson = JSON.parse(yzmHtml);
            let ocrHtml = post('https://api.nn.ci/ocr/b64/text', {
                body: yzmJson.body
            });
            let cleanCode = cleanVerificationCode(ocrHtml);
            let submit_url = `${HOST}/index.php/ajax/verify_check?type=search&verify=${cleanCode}`;
            let submitHtml = request(submit_url);
        }
        let contentHtml = request(input);
        let list = pdfa(contentHtml, ".public-list-box");
        let d = [];
        list.forEach(it => {
            let title = pdfh(it, ".thumb-txt a&&Text");
            let desc = pdfh(it, "a&&Text");
            let img = pdfh(it, "img.lazy&&data-src");
            let url = pd(it, ".thumb-txt a&&href");
            d.push({
                title: title,
                desc: desc,
                pic_url: img,
                url: url
            });
        });
        setResult(d);
    }),
    lazy: $js.toString(() => {
        let html = fetch(input);
        let json = JSON.parse(html.match(/r player_.*?=(.*?)</)[1]);
        let fullTitle = pdfh(html, 'title&&Text');
        let targetTitle = fullTitle.split('-')[0].trim();
        let turl;
        let url = json.url;
        let from = json.from;
        let furl = HOST + '/static/player/' + from + '.js';
        if (json.encrypt == '1') {
            turl = unescape(url);
        } else if (json.encrypt == '2') {
            turl = unescape(base64Decode(url));
        } else {
            let str = fetch(furl);
            let jxurl = str.match(/src="(.*?)'/)[1] + url + '&next=//&title=' + targetTitle;
            let jxstr = fetch(jxurl);
            let curl = jxstr.split('url":"')[1].split('",')[0];
            let dmkey = jxstr.split('dmkey":"')[1].split('",')[0];
            let pbgjz = jxstr.split('pbgjz":"')[1].split('",')[0];
            if (!curl || !dmkey || !pbgjz) {
                throw new Error("参数提取失败");
            }
            let now = new Date();
            let utcHours = now.getUTCHours();
            let utcDate = new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                utcHours, 0, 0, 0
            ));
            let timestampInSeconds = Math.floor(utcDate.getTime() / 1000);
            let inputString = timestampInSeconds + 'knvod';

            function sha256(str) {
                return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
            }
            let key = sha256(inputString);
            let apiUrl = 'https://viaaa.cdnjson.xyz/post.php';
            let postData = {
                url: curl,
                pbgjz: pbgjz,
                dmkey: dmkey,
                key: key
            };
            let response = fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(postData)
            });
            let responseJson;
            try {
                responseJson = JSON.parse(response);
            } catch (e) {
                throw new Error(`响应解析失败: ${response}`);
            }
            turl = responseJson.knvod;
        }
        input = {
            parse: 0,
            url: turl
        };
    })
}
