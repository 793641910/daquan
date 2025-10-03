/*!
 * Copyright © 2025 Taoist
 * Licensed under LGPL3 (https://github.com/hjdhnx/drpy-node/blob/main/LICENSE)
 */
/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 1,
  title: '木兮',
  lang: 'dr2'
})
*/


globalThis.h_ost = 'https://film.symx.club';

var rule = {
    title: '木兮',
    host: h_ost,
    url: '/api/film/category/list?fyfilter',
    detailUrl: '/api/film/detail?id=fyid',
    searchUrl: '/api/film/search?keyword=**&pageNum=fypage&pageSize=10',
    filter_url: 'categoryId=fyclass&language={{fl.lang}}&pageNum=fypage&pageSize=15&sort={{fl.by or updateTime}}&year={{fl.year}}',
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    play_parse: true,
    search_match: true,
    tab_order:['超清4K','线路2','线路3'],
    class_name: '电影&电视剧&综艺&动漫&短剧',
    class_url: '2&1&3&4&5',
    推荐: $js.toString(() => {
        let d = [];
        let html = request('https://film.symx.club/api/film/category');
        let data = JSON.parse(html).data[0].filmList;
        data.forEach(item => {
            let title = item.name;
            if (!/名称|排除/.test(title)) {
                d.push({
                    title: title,
                    desc: item.updateStatus,
                    img: item.cover,
                    url: item.id,
                });
            }
        });
        setResult(d);
    }),
    一级: $js.toString(() => {
        let d = [];
        let html = request(input);
        let data = JSON.parse(html).data.list;
        data.forEach(item => {
            let title = item.name;
            if (!/名称|排除/.test(title)) {
                d.push({
                    title: title,
                    desc: item.updateStatus,
                    img: item.cover,
                    year: item.year,
                    url: item.id,
                });
            }
        });
        setResult(d);
    }),

    二级: $js.toString(() => {
    let html = request(input);
    let data = JSON.parse(html).data;
    VOD = {
        vod_name: data.name || '暂无名称',
        type_name: data.doubanScore ? data.doubanScore.toString() : '暂无评分',
        vod_pic: data.cover || '暂无图片',
        vod_remarks: data.updateStatus || '暂无更新状态',
        vod_year : data.year || '暂无年份',
        vod_area : data.other || '暂无地区',
        vod_actor : data.actor || '暂无主演',
        vod_director : data.director || '暂无导演',
        vod_content: data.blurb || '暂无剧情介绍'
    };

    let playlist = data.playLineList || [];
    let playFrom = [];
    let playUrl = [];

    playlist.forEach(line => {
        playFrom.push(line.playerName);
        let lines = line.lines || [];
        let lineUrls = lines.map(tag => {
            let title = tag.name;
            let url = `id:${tag.id}`;
            return `${title}$${url}`;
        });
        playUrl.push(lineUrls.join("#"));
    });
     
    VOD.vod_play_from = playFrom.join("$$$");
    VOD.vod_play_url = playUrl.join("$$$");
    }),

    搜索: $js.toString(() => {
        let d = [];
        let html = request(input);
        let data = JSON.parse(html).data.list;
        data.forEach(item => {
            let title = item.name;
            d.push({
                title: title,
                desc: item.updateStatus,
                img: item.cover,
                url: item.id,
            });
        });
        setResult(d);
    }),
    lazy: $js.toString(() => {
        input = input.replace(/id:/g, '')
        let purl = 'https://film.symx.club/api/line/play/parse?lineId=' + input;
        let html = request(purl);
        let url = JSON.parse(html).data;
        input = {
            parse: 0,
            url: url
        };
    }),

}