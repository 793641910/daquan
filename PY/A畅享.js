/*
v5简易模版  
修复搜索
修复所有线路播放逻辑
此为未加密版，筛选未写，分类未自动获取，无聊的可以尝试修改，懒得写了
BY 十一、
*/

import { Crypto, _ } from 'assets://js/lib/cat.js';

let siteUrl = '';
let siteKey = '';
let siteType = 0;
let headers = {
    'User-Agent': 'okhttp/3.12.11',
    'token': 'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJfY2hlY2siOiJjMzk4MTJjYzJhMTFiZDM3MDFkMTEzMzllOTBkY2MyMyIsInVzZXJfaWQiOjI3NzksInVzZXJfbmFtZSI6InR0MTIzNCJ9LCJleHAiOjE3ODE2MTA3NjkuNDQ1Mzc5NSwiaWF0IjoxNzUwMDc0NzY5LCJpc3MiOiJBcHBUbyIsImp0aSI6IjJhZmFmODIyZmUxMGViZTU4NTFiMjc0MzE4NDU4MDNkIiwibmJmIjoxNzUwMDc0NzY5LCJzdWIiOiJBcHBUbyJ9.oWw_WxkNZnvt1CDTcAstRt5dVKcFEGKQ_wx_2mOeg7E',
};

async function request(reqUrl, data, header, method) {
    let res = await req(reqUrl, {
        method: method || 'get',
        data: data || '',
        headers: header || headers,
        postType: method === 'post' ? 'form' : '',
        timeout: 5000,
    });
    return res.content;
}

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype;
    if (cfg.ext) {
        try {
            let words = Crypto.enc.Base64.parse(cfg.ext);
            siteUrl = words.toString(Crypto.enc.Utf8);
        } catch (e) {
            siteUrl = cfg.ext;
        }
    }
    siteUrl = siteUrl || 'http://118.89.203.120:8366';
}

async function home(filter) {

let response = await request(`${siteUrl}/apptov5/v1/config/get?p=android`, null, headers, 'get');
    let kjson;
    try {
        kjson = JSON.parse(response);
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
    let classes = [];
    let klists = kjson.data.get_type || [];
    _.forEach(klists, it => {
        classes.push({
            type_id: it.type_id,
            type_name: it.type_name,
        });
    });
    const filters = {};
    return JSON.stringify({
        class: classes,
        filters: filters,
    });
}

async function homeVod() {
    let response = await request(`${siteUrl}/apptov5/v1/vod/lists?type_id=1&order=time&page=1&pageSize=6`, null, headers, 'get');
    let kjson;
    try {
        kjson = JSON.parse(response);
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
    let videos = [];
    let klists = kjson.data.data || [];
    _.forEach(klists, it => {
        videos.push({
            vod_id: it.vod_id,
            vod_name: it.vod_name,
            vod_pic: it.vod_pic,
            vod_remarks: it.vod_remarks || '',
            vod_year: it.vod_year || '',
            vod_content: it.vod_content || '',
        });
    });
    return JSON.stringify({
        list: videos,
    });
}

async function category(tid, pg, filter, extend) {
    if (pg <= 0) pg = 1;
    let url = `${siteUrl}/apptov5/v1/vod/lists?type_id=${tid}&area=${extend.area || ''}&year=${extend.year || ''}&order=${extend.by || 'time'}&page=${pg}&pageSize=20`;
    let response = await request(url, null, headers, 'get');
    let kjson;
    try {
        kjson = JSON.parse(response);
    } catch (e) {
        return JSON.stringify({ page: pg, pagecount: 9999, list: [] });
    }
    let videos = [];
    let klists = kjson.data.data || [];
    _.forEach(klists, it => {
        videos.push({
            vod_id: it.vod_id,
            vod_name: it.vod_name,
            vod_pic: it.vod_pic,
            vod_remarks: it.vod_remarks || '',
            vod_year: it.vod_year || '',
            vod_content: it.vod_content || '',
        });
    });
    return JSON.stringify({
        page: pg,
        pagecount: 9999,
        list: videos,
    });
}

async function detail(id) {
    let url = `${siteUrl}/apptov5/v1/vod/getVod?id=${id}`;
    let response = await request(url, null, headers, 'get');
    let kjson;
    try {
        kjson = JSON.parse(response);
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
    let v = kjson.data;
    let labelMap = {};
    if (v.get_parsing && v.get_parsing.lists && Array.isArray(v.get_parsing.lists)) {
        v.get_parsing.lists.forEach(item => {
            if (item.key && Array.isArray(item.config)) {
                labelMap[item.key] = item.config
                    .map(config => config.label)
                    .filter(label => label && typeof label === 'string');
            }
        });
    }
    let video = {
        vod_id: v.vod_id,
        vod_name: v.vod_name || '',
        type_name: v.type_name || '',
        vod_year: v.vod_year || '',
        vod_area: v.vod_area || '',
        vod_remarks: v.vod_remarks || '',
        vod_actor: v.vod_actor || '',
        vod_director: v.vod_director || '',
        vod_content: v.vod_content || '无',
        vod_pic: v.vod_pic || '',
        vod_play_from: '',
        vod_play_url: '',
    };
    let playSources = [];
    _.forEach(v.vod_play_list || [], value => {
        let show = value.player_info.show || value.from || '';
        let urls = _.map(value.urls || [], v => {
            return `${v.name}$${value.player_info.from}@${v.url}`;
        }).join('#');
        playSources.push({ show, urls });
    });
    const getPriority = (show) => {
        const s = show.toLowerCase();
        if (s.includes('旺旺')) return 0;
        if (s.includes('鲸澜4k')) return 1;
        if (s.includes('4k')) return 2;
        if (s.includes('专线')) return 3;
        if (s.includes('独家')) return 4;
        if (s.includes('秒播')) return 5;
        return 6;
    };
    playSources.sort((a, b) => getPriority(a.show) - getPriority(b.show));
    video.vod_play_from = _.map(playSources, s => s.show).join('$$$');
    video.vod_play_url = _.map(playSources, s => s.urls).join('$$$');
    globalThis.labelMap = labelMap;
    return JSON.stringify({
        list: [video],
    });
}

async function play(flag, id, flags) {
    let parts = id.split('@');
    if (parts.length !== 2) {
        return JSON.stringify({
            parse: 1,
            url: id,
            jx: 0,
        });
    }
    let [from, url] = parts;
    if (url.includes('nkvod')) {
        return JSON.stringify({
            parse: 1,
            url: url,
            jx: 0,
        });
    }
    let isM3U8 = url.includes('m3u8');
    let labels = globalThis.labelMap && globalThis.labelMap[from] ? globalThis.labelMap[from] : null;
    if (!labels || labels.length === 0) {
        return JSON.stringify({
            parse: isM3U8 ? 0 : 1,
            url: isM3U8 ? url : '解析失败: 无可用 label',
            jx: 0,
        });
    }
    let playHeaders = {
        'User-Agent': 'Dart/2.19 (dart:io)',
        'appto-local-uuid': '65e13d62-0fea-20bb-8c61-8be174abdefd',
        'token': 'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJfY2hlY2siOiJjMzk4MTJjYzJhMTFiZDM3MDFkMTEzMzllOTBkY2MyMyIsInVzZXJfaWQiOjI3NzksInVzZXJfbmFtZSI6InR0MTIzNCJ9LCJleHAiOjE3ODE2MTA3NjkuNDQ1Mzc5NSwiaWF0IjoxNzUwMDc0NzY5LCJpc3MiOiJBcHBUbyIsImp0aSI6IjJhZmFmODIyZmUxMGViZTU4NTFiMjc0MzE4NDU4MDNkIiwibmJmIjoxNzUwMDc0NzY5LCJzdWIiOiJBcHBUbyJ9.oWw_WxkNZnvt1CDTcAstRt5dVKcFEGKQ_wx_2mOeg7E',
    };
    for (let label of labels) {
        let data = {
            'play_url': url,
            'label': label,
            'key': from,
        };
        try {
            let response = await request(`${siteUrl}/apptov5/v1/parsing/proxy`, data, playHeaders, 'post');
            let result = JSON.parse(response);
            if (result.data && result.data.url) {
                return JSON.stringify({
                    parse: 0,
                    url: result.data.url,
                    jx: 0,
                });
            }
        } catch (e) {}
    }
    return JSON.stringify({
        parse: isM3U8 ? 0 : 1,
        url: isM3U8 ? url : '解析失败: 所有 label 尝试失败',
        jx: 0,
    });
}

async function search(wd, quick, pg) {
    pg = parseInt(pg) || 1;
    if (pg <= 0) pg = 1;
    let url = `${siteUrl}/apptov5/v1/search/lists?wd=${encodeURIComponent(wd)}&page=${pg}&type=`;
    let response;
    try {
        response = await request(url, null, headers, 'get');
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
    let kjson;
    try {
        kjson = JSON.parse(response);
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
    let videos = [];
    let klists = kjson.data.data || [];
    _.forEach(klists, it => {
        videos.push({
            vod_id: it.vod_id,
            vod_name: it.vod_name,
            vod_pic: it.vod_pic,
            vod_remarks: it.vod_remarks || '',
            vod_year: it.vod_year || '',
            vod_content: it.vod_content || '',
        });
    });
    return JSON.stringify({
        list: videos,
    });
}

function aesDecode(str, keyStr, ivStr, type) {
    const key = Crypto.enc.Utf8.parse(keyStr);
    str = str.replace(/^\uFEFF/, '');
    if (type === 'hex') {
        try {
            str = Crypto.enc.Hex.parse(str);
            const decrypted = Crypto.AES.decrypt({ ciphertext: str }, key, {
                iv: Crypto.enc.Utf8.parse(ivStr),
                mode: Crypto.mode.CBC,
                padding: Crypto.pad.Pkcs7,
            });
            return decrypted.toString(Crypto.enc.Utf8);
        } catch (e) {
            return null;
        }
    }
    try {
        const decrypted = Crypto.AES.decrypt(str, key, {
            iv: Crypto.enc.Utf8.parse(ivStr),
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.Pkcs7,
        });
        return decrypted.toString(Crypto.enc.Utf8);
    } catch (e) {
        return null;
    }
}

function aesEncode(str, keyStr, ivStr, type) {
    const key = Crypto.enc.Utf8.parse(keyStr);
    let encData = Crypto.AES.encrypt(str, key, {
        iv: Crypto.enc.Utf8.parse(ivStr),
        mode: Crypto.mode.CBC,
        padding: Crypto.pad.Pkcs7,
    });
    if (type === 'hex') {
        return encData.ciphertext.toString(Crypto.enc.Hex);
    }
    return encData.toString();
}

function md5(text) {
    return Crypto.MD5(text).toString();
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        detail: detail,
        play: play,
        search: search,
    };
}