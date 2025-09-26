var rule = {
  类型: "影视",
  title: "金牌[画质]",
  desc: "金牌影院纯js版本",
  host: "https://www.jiabaide.cn",
  homeUrl: "",
  url: "/api/mw-movie/anonymous/video/list?pageNum=fypage&pageSize=30&sort=1&sortBy=1&type1=fyclass",
  searchUrl: "/api/mw-movie/anonymous/video/searchByWordPageable?keyword=**&pageNum=fypage&pageSize=12&type=false",
  searchable: 1,
  quickSearch: 1,
  timeout: 5000,
  play_parse: true,
  
  // 公共配置
  common: {
    key: "cb808529bae6b6be45ecfab29a4889bc",
    deviceId: "58a80c52-138c-48fd-8edb-138fd74d12c8",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
  },

  // 公共方法
  _sign: function(params) {
    const t = new Date().getTime();
    const signkey = `${params}&key=${this.common.key}&t=${t}`;
    return {
      key: CryptoJS.SHA1(CryptoJS.MD5(signkey).toString()).toString(),
      t: t
    };
  },

  _request: function(url, params) {
    const sign = this._sign(params);
    return request(url, {
      headers: {
        "User-Agent": this.common.ua,
        "deviceId": this.common.deviceId,
        "sign": sign.key,
        "t": sign.t
      }
    });
  },

  class_name: '电影&电视剧&综艺&动漫',
  class_url: '1&2&3&4',
class_parse: $js.toString(() => {
const responseData = JSON.parse(rule._request(`${rule.host}/api/mw-movie/anonymous/get/filer/type`,params));
log(`✅responseData的结果: ${JSON.stringify(responseData)}`);

}),
  一级: $js.toString(() => {
    const params = `pageNum=${MY_PAGE}&pageSize=30&sort=1&sortBy=1&type1=${MY_CATE}`;
    const responseData = JSON.parse(rule._request(input, params)).data.list;
    
    const result = responseData.map(it => ({
      title: it.vodName,
      desc: it.vodRemarks,
      img: it.vodPic,
      url: `/detail/${it.vodId}`
    }));
    
    setResult(result);
  }),

  二级: $js.toString(() => {
    const id_ = orId.split("/")[2];
    const params = `id=${id_}`;
    const detailResponse = rule._request(
      `${rule.host}/api/mw-movie/anonymous/video/detail?id=${id_}`,
      params
    );
    
    const detailData = JSON.parse(detailResponse).data;
    VOD = {
      vod_name: detailData.vodName,
      type_name: detailData.ctypeName,
      vod_pic: detailData.vodPic,
      vod_content: detailData.vodContent,
      vod_year: detailData.vodYear,
      vod_area: detailData.vodArea,
      vod_actor: detailData.vodActor || '未知',
      vod_director: detailData.vodDirector || '未知',
      vod_remarks: detailData.vodRemarks || '完结'
    };

    const playUrls = detailData.episodeList.map(it => 
      `${it.name}$${`/vod/play/${id_}/sid/${it.nid}`}`
    );
    
    VOD.vod_play_from = "兵哥爱金牌";
    VOD.vod_play_url = playUrls.join("#");
  }),

  搜索: $js.toString(() => {
    const params = `keyword=${KEY}&pageNum=${MY_PAGE}&pageSize=12&type=false`;
    const searchData = JSON.parse(rule._request(input, params)).data.list;
    
    const result = searchData.map(it => ({
      title: it.vodName,
      desc: it.vodVersion,
      img: it.vodPic,
      url: `/detail/${it.vodId}`
    }));
    
    setResult(result);
  }),


  lazy: $js.toString(() => {
    const pid = input.split("/")[3];
    const nid = input.split("/")[5];
    const params = `clientType=1&id=${pid}&nid=${nid}`;
    const playData = JSON.parse(rule._request(
      `${rule.host}/api/mw-movie/anonymous/v2/video/episode/url?${params}`,
      params
    )).data;
    //log(`✅playData的结果: ${JSON.stringify(playData)}`);
    let list = playData.list;
    let urls = [];
    list.forEach((it) => {
      urls.push(it.resolutionName, it.url);
    });
    input = {parse: 0, url: urls};
    
    /*
    input = {
      parse: 0,
      url: playData.list.map(it => [it.resolutionName, it.url])
    };
    */
  })
  
};