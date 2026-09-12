import { GuideArticle } from '@/types/guide';

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: 'true-7-seater-mpv-vs-5-plus-2-suv',
    title: '正七人座 MPV vs 5+2 SUV 深度剖析：第三排腿部支撐與追撞潰縮區安全真相',
    subtitle: '買車前必看！別讓「偶爾應急」變成家人的長途受罪與安全盲點',
    category: 'space-and-safety',
    categoryLabel: '空間與安全',
    publishedAt: '2024-03-15',
    updatedAt: '2024-04-01',
    readTimeMinutes: 7,
    author: {
      name: '林冠宇 (Ken Lin)',
      role: '資深車輛工程技師 & 家庭用車安全專欄作家',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    summary: '許多家庭在換車時常陷入「正七人座 MPV」與「5+2 休旅車」的掙扎。本文從人體工學大腿支撐、第三排進出動線、滿載行李容積，以及最重要的「高速追撞後方潰縮區安全距離」四大維度展開全客觀對比。',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'definition', title: '1. 什麼是「正七人座 MPV」與「5+2 SUV」？', level: 2 },
      { id: 'ergonomics', title: '2. 人體工學差異：為什麼 5+2 的第三排「像坐小板凳」？', level: 2 },
      { id: 'safety-crumple-zone', title: '3. 致命盲區：後方追撞潰縮距離實測分析', level: 2 },
      { id: 'luggage-reality', title: '4. 七人滿載時的行李箱殘酷真相', level: 2 },
      { id: 'comparison-table', title: '5. 正 MPV vs 5+2 SUV 核心指標對照表', level: 2 },
      { id: 'decision-checklist', title: '6. 選購決策樹：你到底該買哪一種？', level: 2 },
    ],
    keyTakeaways: [
      '正 MPV 具備專屬下沉式底盤，第三排座椅離地高足夠，大腿能獲得完整支撐；5+2 SUV 因後軸差速器與懸吊機構，椅面極低，膝蓋被迫彎曲宛如坐板凳。',
      '安全追撞緩衝方面，正 MPV（如 Sienna、Carnival）在第三排展開時仍具備 60~110 公分以上的緩衝潰縮縱深；多數 5+2 SUV 第三排頭枕距離後擋風玻璃僅剩 20~30 公分。',
      '若家庭每年滿載超過 4 次、單程行車超過 1 小時，或乘員包含身高 165 公分以上之成人，強烈建議直上正七人座 MPV。',
    ],
    relatedCarSlugs: ['toyota-sienna', 'kia-carnival', 'hyundai-custin', 'skoda-kodiaq'],
    contentHtml: `
      <section id="definition">
        <h2>1. 什麼是「正七人座 MPV」與「5+2 SUV」？</h2>
        <p>在台灣汽車市場中，許多標榜「七人座」的車款其實在底盤架構與設計初衷上有著天壤之別：</p>
        <ul>
          <li><strong>正七人座 MPV（Multi-Purpose Vehicle）</strong>：以 Sienna、Carnival、Custin、Multivan 為代表。這類車型從底盤開發初期即以「載運 7 位成人與其行李」為核心目標，車體方正、車長通常在 4.9m 至 5.2m 之間，具備滑門與平整化地板。</li>
          <li><strong>5+2 跨界／休旅車（5+2 SUV）</strong>：以 Skoda Kodiaq、Kia Sorento、Hyundai Santa Fe 為代表。本質上是以「標準中型五人座 SUV」的底盤軸距拉長衍生而來，第三排座椅屬於「加裝之折疊應急座」。</li>
        </ul>
      </section>

      <section id="ergonomics">
        <h2>2. 人體工學差異：為什麼 5+2 的第三排「像坐小板凳」？</h2>
        <p>很多試車時只在展間坐 30 秒的買家，常誤以為「坐得進去就等於能坐」。然而人體工學的關鍵在於<strong>「椅面離地高度（Seat Cushion Height）」</strong>與<strong>「大腿支撐度（Thigh Support）」</strong>：</p>
        <p>5+2 SUV 為了保有四驅系統傳動軸、後多連桿懸吊與備胎空間，後底板普遍偏高。設計師為了維持第三排成人不頂到車頂，只能將第三排座椅坐墊做得很薄、很貼近地板。其結果就是：<strong>成年人入座後，大腿完全懸空無法貼合椅面，全身重量全部集中在臀部坐骨結節上</strong>，超過 30 分鐘便會感到腰椎痠痛疲憊。</p>
        <p>相反地，正七人座 MPV 的底盤採用專屬低重心平整化佈局，第三排椅面高度通常在 330mm 以上，椅墊泡棉厚實，椅背更具備多段後仰調節，能提供宛如一般房車後座的完整承托。</p>
      </section>

      <section id="safety-crumple-zone">
        <h2>3. 致命盲區：後方追撞潰縮距離實測分析</h2>
        <p>這是車商型錄最少著墨、但攸關全家人生命安全的關鍵環節：<strong>後方撞擊潰縮區（Rear Crumple Zone）</strong>。</p>
        <p>在高速公路發生連環追撞或遭後方大貨車煞車不及推撞時，車尾必須有足夠的鋼樑與結構吸收動能：</p>
        <ul>
          <li><strong>5+2 SUV</strong>：在 7 人坐滿的情況下，第三排乘客的後腦勺距離後擋風玻璃通常僅剩 <strong>20 至 30 公分</strong>，後行李箱幾乎沒有緩衝鋼樑厚度。一旦遭強烈追撞，潰縮空間極為有限。</li>
          <li><strong>正七人座 MPV</strong>：例如 Toyota Sienna 與 Kia Carnival，即使坐滿 7 人，後方行李廂深度仍有 <strong>60 至 70 公分以上</strong>，原廠具備深凹式下沉行李槽與專屬加強型後防撞鋼樑，能有效提供吸收撞擊動能的實質生存空間。</li>
        </ul>
      </section>

      <section id="luggage-reality">
        <h2>4. 七人滿載時的行李箱殘酷真相</h2>
        <p>想像一下：全家 7 個人要進行三天兩夜的宜蘭花東自駕遊。每人至少有一個行李袋或軟包，再加上媽媽的嬰兒推車、長輩的折疊輪椅或拐杖。</p>
        <p>此時 5+2 SUV 的後廂容積往往只剩下 200~300 公升左右，深度僅約 35 公分，只能勉強塞進兩件輕便登機箱或軟式背包，其他行李只能抱在乘客腿上，嚴重犧牲舒適度與行車視線。</p>
        <p>正七人座 MPV 則完全不同，Sienna 滿載狀態下擁有高達 1,107 公升的後廂置物空間，Carnival 亦有 627 公升，4 個 28 吋大行李箱直立推入後還能再放嬰兒推車，這才是真正無後顧之憂的家庭遠行。</p>
      </section>

      <section id="comparison-table">
        <h2>5. 正 MPV vs 5+2 SUV 核心指標對照表</h2>
        <div class="overflow-x-auto my-6">
          <table class="w-full text-left border-collapse border border-slate-200">
            <thead>
              <tr class="bg-[#f0f5fb] text-cyan-800">
                <th scope="col" class="p-3 border border-slate-200">評比項目</th>
                <th scope="col" class="p-3 border border-slate-200">正七人座 MPV (如 Carnival / Sienna)</th>
                <th scope="col" class="p-3 border border-slate-200">5+2 跨界 SUV (如 Kodiaq)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" class="p-3 border border-slate-200 font-semibold text-slate-800">第三排乘坐適應性</th>
                <td class="p-3 border border-slate-200 text-emerald-700 font-semibold">175cm 以上成人長途 2 小時無壓力</td>
                <td class="p-3 border border-slate-200 text-rose-700 font-semibold">建議僅供 160cm 以下或兒童短途</td>
              </tr>
              <tr class="bg-[#f8fafc]">
                <th scope="row" class="p-3 border border-slate-200 font-semibold text-slate-800">第二排走道動線</th>
                <td class="p-3 border border-slate-200 text-emerald-700 font-semibold">多為 2+2+3，中央有 18~22cm 專用走道</td>
                <td class="p-3 border border-slate-200 text-rose-700 font-semibold">無走道，進出需手動前翻第二排</td>
              </tr>
              <tr>
                <th scope="row" class="p-3 border border-slate-200 font-semibold text-slate-800">後方追撞潰縮緩衝</th>
                <td class="p-3 border border-slate-200 text-emerald-700 font-semibold">優良 (後方緩衝縱深 60~80cm)</td>
                <td class="p-3 border border-slate-200 text-amber-800 font-semibold">緊繃 (後方緩衝縱深僅 20~30cm)</td>
              </tr>
              <tr class="bg-[#f8fafc]">
                <th scope="row" class="p-3 border border-slate-200 font-semibold text-slate-800">滿載行李箱容量</th>
                <td class="p-3 border border-slate-200 text-emerald-700 font-semibold">450L ~ 1,100L (可放多個28吋箱)</td>
                <td class="p-3 border border-slate-200 text-rose-700 font-semibold">200L ~ 340L (僅能放登機箱/背包)</td>
              </tr>
              <tr>
                <th scope="row" class="p-3 border border-slate-200 font-semibold text-slate-800">車門開啟機構</th>
                <td class="p-3 border border-slate-200 text-emerald-700 font-semibold">雙側電動滑門（狹窄停車超好開）</td>
                <td class="p-3 border border-slate-200 text-amber-800 font-semibold">傳統外推門（開門易受兩側車輛限制）</td>
              </tr>
              <tr class="bg-[#f8fafc]">
                <th scope="row" class="p-3 border border-slate-200 font-semibold text-slate-800">市區停車與非鋪裝路面</th>
                <td class="p-3 border border-slate-200 text-amber-800 font-semibold">車身長寬大，部分停車位有限制</td>
                <td class="p-3 border border-slate-200 text-emerald-700 font-semibold">車長多在 4.8m 內，離地高適應爛路</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="decision-checklist">
        <h2>6. 選購決策樹：你到底該買哪一種？</h2>
        <p>請根據你的真實生活用車場景做出理性選擇：</p>
        <p><strong>強烈建議選擇「正七人座 MPV」的情境：</strong></p>
        <ul>
          <li>家中有兩位長輩，出遊需同時帶父母與小孩（三代同堂）。</li>
          <li>有兩張以上的嬰兒汽座需要固定安裝，且第三排仍需頻繁坐人。</li>
          <li>家庭常安排跨縣市 2 天 1 夜以上的露營或長途飯店自駕遊。</li>
        </ul>
        <p><strong>適合選擇「5+2 SUV」的情境：</strong></p>
        <ul>
          <li>一年之中 90% 的時間只有 3 到 5 人在車上，第三排純屬偶爾親友聚餐短途接駁（車程 20 分鐘內）。</li>
          <li>住家或公司停車位極為狹小、老舊機械車位限寬 1850mm。</li>
          <li>喜愛戶外野營林道輕度越野，對底盤離地高度與全時四驅有剛性需求。</li>
        </ul>
      </section>
    `,
  },
  {
    slug: 'sliding-door-vs-hinged-door-child-seats',
    title: '雙側滑門 vs 傳統外推門：雙汽座爸媽必看！狹窄車位抱小孩與防撞實測',
    subtitle: '抱著熟睡孩子與大包小包時，那扇側滑門將決定你的優雅或崩潰',
    category: 'doors-and-seats',
    categoryLabel: '車門與汽座',
    publishedAt: '2024-03-20',
    updatedAt: '2024-04-02',
    readTimeMinutes: 6,
    author: {
      name: '陳怡萱 (Jessica Chen)',
      role: '母嬰乘車安全顧問 & 兒童汽車安全座椅推廣志工',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    summary: '在台灣典型的 2.3m~2.5m 窄小停車格中，傳統外推門往往只能開啟不到 30 度角。本文針對家中有雙寶汽座的父母，實測側滑門在開口寬度、防撞保護、長輩扶手與電動腳踢感應帶來的巨大生活便利。',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'parking-dilemma', title: '1. 台灣停車環境痛點：傳統外推門的「30度角地獄」', level: 2 },
      { id: 'sliding-door-advantages', title: '2. 雙側電動滑門的三大無可替代優勢', level: 2 },
      { id: 'child-seat-installation', title: '3. 雙汽座安裝實測：ISOFIX 與第三排進出干涉', level: 2 },
      { id: 'safety-features', title: '4. 防夾機制與兒童安全防護等級', level: 2 },
      { id: 'summary-verdict', title: '5. 總結評比：誰是雙寶家庭的真正救星？', level: 2 },
    ],
    keyTakeaways: [
      '電動側滑門完全不佔用車側橫向開啟空間，即使兩側鄰車停得極貼近，也能保有 70~80 公分的完整淨開口。',
      '抱嬰幼兒扣安全帶時，父母可以整個人「走進」車廂站在地板上操作，免去在車外彎腰淋雨受風吹的痛苦。',
      '傳統外推門在安裝兩張安全汽座後，第二排座椅將完全無法向前傾倒，導致第三排乘客完全被封死在後座無法進出；唯有中央走道型 MPV 方可解套。',
    ],
    relatedCarSlugs: ['hyundai-custin', 'toyota-sienna', 'kia-carnival', 'volkswagen-caddy-maxi'],
    contentHtml: `
      <section id="parking-dilemma">
        <h2>1. 台灣停車環境痛點：傳統外推門的「30度角地獄」</h2>
        <p>在台灣去賣場、大樓地下室或路邊停車，停車位寬度通常在 2.3 公尺至 2.5 公尺之間。當你停好車，兩側都有休旅車時，傳統外推式車門往往只能打開 20 到 30 度角。</p>
        <p>如果你是一位需要抱著 10 公斤重、熟睡幼兒的父母，你必須側著身體、深怕車門刮傷隔壁百萬名車，再以極為詭異的角度把小孩「塞」進安全座椅中。這不僅容易閃到腰，更常發生幼童頭部撞到門框的驚險畫面。</p>
      </section>

      <section id="sliding-door-advantages">
        <h2>2. 雙側電動滑門的三大無可替代優勢</h2>
        <ol>
          <li><strong>零死角極大開口</strong>：側滑門開啟寬度通常達到 700mm 至 800mm 以上，車門向後平行滑移，完全不佔用車身兩側空間。</li>
          <li><strong>站姿操作抱小孩</strong>：因為 MPV 底盤低、車頂高，父母可以一腳踏進車內地板，直立或微傾身體替孩子扣好安全帶，遇到下雨天更可在車內優雅關門。</li>
          <li><strong>長輩與幼童自主上下車無負擔</strong>：滑門通常搭配 B 柱專用加長扶手與低階梯踏板（如 Custin 38cm、Sienna 40cm），3 歲幼童能自己走上去，75 歲長輩膝蓋免承受巨大下蹲受力。</li>
        </ol>
      </section>

      <section id="child-seat-installation">
        <h2>3. 雙汽座安裝實測：ISOFIX 與第三排進出干涉</h2>
        <p>這是絕大多數首次購買 7 人座車主最容易忽略的<strong>「致命痛點」</strong>：</p>
        <p>如果買的是 2+3+2 佈局（如多數 5+2 SUV 或某些 MPV），當你在第二排左、右兩張座椅都裝上笨重的 ISOFIX 安全汽座後，<strong>第二排座椅便「完全無法向前傾倒滑移」！</strong></p>
        <p>這意味著：如果要坐進第三排，第三排的乘客要麼必須從後行李箱爬進去，要麼得每次都花 5 分鐘拆卸重裝兒童安全座椅！</p>
        <p>解決方案只有兩種：</p>
        <ul>
          <li>選擇 <strong>2+2+3 獨立座椅車型（如 Custin, Carnival, Sienna, ID. Buzz）</strong>：中間保留 18~22 公分的走道，即便第二排兩張椅子都裝滿大型汽座，第三排乘客依然可以從容自走道進出。</li>
          <li>選擇像 <strong>Volkswagen Caddy Maxi</strong> 這種第三排自帶 2 組獨立 ISOFIX 的車款，將汽座分別安裝在第二排右側與第三排右側，留出左側完整進出動線。</li>
        </ul>
      </section>

      <section id="safety-features">
        <h2>4. 防夾機制與兒童安全防護等級</h2>
        <p>現代原廠電動側滑門皆配備多重超音波防夾感應膠條與反向釋放機構，只要遇到輕微阻力（如手臂或衣物觸碰）便會立即反向開啟或停滯，安全性極高。</p>
        <p>此外，電動側滑門開關均由駕駛艙具備主控安全鎖，幼童在車內無法擅自誤推開門衝出車道，相較於傳統外推門常發生「開門未注意後方機車撞擊（Door-zone accident）」，側滑門在台灣都市具備壓倒性的安全防護優勢。</p>
      </section>

      <section id="summary-verdict">
        <h2>5. 總結評比：誰是雙寶家庭的真正救星？</h2>
        <p>如果你的購車預算在 130 萬以上，且家中有兩位需要使用安全座椅的學齡前幼童，<strong>請毫不猶豫將「雙側電動滑門」與「2+2+3 中央走道」列為第一優先必備條件</strong>。這項配備帶來的幸福感與家庭和睦度，遠遠勝過多 50 匹馬力或炫目的運動空力套件。</p>
      </section>
    `,
  },
  {
    slug: '2-2-3-vs-2-3-2-seating-layout-guide',
    title: '2+2+3 走道式 vs 2+3+2 三座式：家庭用車真實動線與滿載乘坐深度對決',
    subtitle: '看似只差一個座位安排，卻徹底改變全家人的上下車動線與裝載彈性',
    category: 'doors-and-seats',
    categoryLabel: '座椅動線',
    publishedAt: '2024-03-25',
    updatedAt: '2024-04-03',
    readTimeMinutes: 5,
    author: {
      name: '林冠宇 (Ken Lin)',
      role: '資深車輛工程技師 & 家庭用車安全專欄作家',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    summary: '2+2+3 與 2+3+2 哪種更好？前者擁有尊榮獨立座與走道，後者五人出遊時能保有無敵行李空間。本文詳細拆解兩種佈局在不同家庭成員結構下的最佳解答。',
    heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'layouts-overview', title: '1. 兩種主流七人座佈局架構', level: 2 },
      { id: '223-pros-cons', title: '2. 2+2+3 獨立走道式：優勢與致命傷', level: 2 },
      { id: '232-pros-cons', title: '3. 2+3+2 正三座式：優勢與致命傷', level: 2 },
      { id: 'family-scenarios', title: '4. 三種家庭情境對號入座', level: 2 },
    ],
    keyTakeaways: [
      '2+2+3 佈局的核心價值在於「中央走道」與「第二排乘客極限舒壓」，適合 6 人以內高頻率全員出遊的家庭。',
      '2+3+2 佈局的核心優勢在於「當 5 個人乘車時，第三排可以完全收納隱藏，換來近千公升的巨量行李箱容積」。',
      '若經常需要乘坐 5 人，2+2+3 必須強迫一人坐去第三排；而 2+3+2 則可讓 5 人全員坐在前兩排，第三排維持折疊狀態。',
    ],
    relatedCarSlugs: ['toyota-sienna', 'hyundai-custin', 'volkswagen-caddy-maxi', 'skoda-kodiaq'],
    contentHtml: `
      <section id="layouts-overview">
        <h2>1. 兩種主流七人座佈局架構</h2>
        <p>在挑選七人座車輛時，座椅配置往往決定了家庭日常出行的便利性：</p>
        <ul>
          <li><strong>2+2+3（Captain Chairs 旗艦獨立雙座）</strong>：第二排為兩張獨立豪華座椅，中間保留 17 至 23 公分的中央通道，第三排為三人連體座。代表車款：Toyota Sienna、Kia Carnival 7人版、Hyundai Custin、Volkswagen ID. Buzz。</li>
          <li><strong>2+3+2（Bench Seat 正三座式）</strong>：第二排為三張相連座椅（6/4 分離或三張獨立），第三排為兩人座。代表車款：Volkswagen Caddy Maxi、Skoda Kodiaq、Kia Carnival 8人版。</li>
        </ul>
      </section>

      <section id="223-pros-cons">
        <h2>2. 2+2+3 獨立走道式：優勢與致命傷</h2>
        <p><strong>優勢：</strong></p>
        <ul>
          <li>第二排尊榮感最高，可配備電動腿靠（Ottoman）、通風加熱與大幅度後仰，非常適合長輩或老闆乘坐。</li>
          <li>有專屬中央走道，第三排乘客進出無須移動第二排座椅，遇到雨天更可在車內前中後排任意走動照顧孩童。</li>
        </ul>
        <p><strong>致命傷：</strong></p>
        <ul>
          <li>如果家裡常態乘坐人數恰好是 <strong>5 個人</strong>，那麼第 5 位乘客「必定得坐到第三排孤單一人」，無法全家聚在前兩排聊天。</li>
          <li>第三排必須坐滿 3 人才能湊齊 7 人，但多數車型的第三排寬度坐 3 位成年男性會相當擁擠。</li>
        </ul>
      </section>

      <section id="232-pros-cons">
        <h2>3. 2+3+2 正三座式：優勢與致命傷</h2>
        <p><strong>優勢：</strong></p>
        <ul>
          <li><strong>5 人滿載時的行李箱無敵大</strong>：第三排平時可 100% 長期收納於底板下，作為大五人座休旅使用，後廂容積高達 800~1,700 公升。</li>
          <li>媽媽坐在第二排中央，兩側可同時顧及左右兩個安全座椅上的孩子。</li>
        </ul>
        <p><strong>致命傷：</strong></p>
        <ul>
          <li>第三排進出必須撥動第二排把手將座椅前翻，若第二排裝滿安全汽座時進出極為困難。</li>
          <li>第二排中央座位多半偏窄偏硬，長途乘坐背部支撐不如獨立單人座椅舒適。</li>
        </ul>
      </section>

      <section id="family-scenarios">
        <h2>4. 三種家庭情境對號入座</h2>
        <ul>
          <li><strong>場景 A（2夫妻 + 2幼童 + 2長輩 = 6人）</strong>：選 <strong>2+2+3</strong>。長輩坐第二排享受獨立皇家尊榮座，兩位幼童坐第三排，父母前座開車，走道方便媽媽遞水、安撫孩子。</li>
          <li><strong>場景 B（2夫妻 + 3小孩 = 5人）</strong>：選 <strong>2+3+2</strong>。平日三位小孩全在第二排，後廂保有完整超大裝載空間放露營裝備或腳踏車。</li>
          <li><strong>場景 C（商務招待 / 尊榮保母車）</strong>：毫不猶豫選 <strong>2+2+3</strong>（如 Lexus LM、Multivan）。</li>
        </ul>
      </section>
    `,
  },
  {
    slug: 'hybrid-vs-diesel-family-mpv',
    title: '家庭 MPV 動力選購抉擇：油電 Hybrid 市區節能與柴油大扭力負重客觀評比',
    subtitle: '滿載 7 人加冷氣爬坡看扭力，市區接送孩子看油耗，哪種動力最適合你？',
    category: 'powertrain',
    categoryLabel: '動力與稅金',
    publishedAt: '2024-03-28',
    updatedAt: '2024-04-05',
    readTimeMinutes: 5,
    author: {
      name: '林冠宇 (Ken Lin)',
      role: '資深車輛工程技師 & 家庭用車安全專欄作家',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    summary: '七人座車重通常超過 2 噸，滿載 7 人更逼近 2.6 噸！傳統汽油自然進氣常有力不從心之感。本文針對油電（Hybrid）與柴油渦輪（Diesel）兩大主力動力進行稅金、保養與駕駛特性深度分析。',
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'weight-challenge', title: '1. 兩噸車重的大考驗：為什麼動力對 7 人座如此關鍵？', level: 2 },
      { id: 'hybrid-features', title: '2. 油電 Hybrid：極致市區平順與怠速吹冷氣神隊友', level: 2 },
      { id: 'diesel-features', title: '3. 柴油 Turbo：滿載爬陡坡的無敵大扭力與稅金紅利', level: 2 },
      { id: 'cost-comparison', title: '4. 台灣每年稅金與長期養護成本對比', level: 2 },
      { id: 'verdict', title: '5. 結論：如何依據用車里程做決定？', level: 2 },
    ],
    keyTakeaways: [
      '柴油引擎低轉速爆發大扭力（如 Carnival 45.0 kgm），在滿載 7 人爬清境農場、司馬庫斯或阿里山時游刃有餘，且 2.2L 柴油年稅金僅 14,938 元。',
      '油電複合動力（如 Sienna）在市區走走停停起步安靜無震動，且可在路邊停等接小孩時長時間倚靠大電池吹冷氣而無引擎怠速抖動與廢氣排放。',
      '若每年里程超過 20,000 公里且常跑長途山區高速，柴油性價比極高；若市區短程通勤、接送小孩比例占 70% 以上，油電混合是身心放鬆的最佳伴侶。',
    ],
    relatedCarSlugs: ['toyota-sienna', 'kia-carnival', 'volkswagen-caddy-maxi', 'volkswagen-multivan'],
    contentHtml: `
      <section id="weight-challenge">
        <h2>1. 兩噸車重的大考驗：為什麼動力對 7 人座如此關鍵？</h2>
        <p>一般中型轎車空重約 1.3 噸，而全尺寸 7 人座 MPV（如 Sienna 或 Carnival）空重就已超過 2.1 噸。當坐滿 7 位成年人（以每人 70kg 計約 490kg）並加上隨身行李，<strong>整車總重輕鬆突破 2.7 噸！</strong></p>
        <p>在如此巨大的載重下，傳統自然進氣汽油引擎往往需要深踩油門、引擎發出高亢噪音拉高轉速才能吃力起步，不僅油耗暴跌，更嚴重影響車內乘員的交談與長輩安寧。</p>
      </section>

      <section id="hybrid-features">
        <h2>2. 油電 Hybrid：極致市區平順與怠速吹冷氣神隊友</h2>
        <p>以 Toyota Sienna 的 2.5L 油電動力為例，其優勢在於：</p>
        <ul>
          <li><strong>起步瞬間純電靜謐</strong>：電動馬達 0 轉速即可輸出最大扭力，走走停停無任何變速箱換檔頓挫。</li>
          <li><strong>學校門口臨停吹冷氣</strong>：接送小孩下課或長輩看診時，可在車內吹冷氣 15-20 分鐘，引擎僅在電池電量不足時微幅啟動充電，毫無傳統燃油車長時間怠速積碳與排氣臭味。</li>
          <li><strong>市區油耗與高速幾乎一致</strong>：能源局平均油耗可達 17.7 km/L，徹底粉碎「大車必定吃油怪獸」的刻板印象。</li>
        </ul>
      </section>

      <section id="diesel-features">
        <h2>3. 柴油 Turbo：滿載爬陡坡的無敵大扭力與稅金紅利</h2>
        <p>以 Kia Carnival 2.2 CRDi 與 VW Caddy Maxi 2.0 TDI 為代表的柴油動力：</p>
        <ul>
          <li><strong>峰值扭力高達 32.6 ~ 45.0 kgm</strong>：引擎在 1750 轉左右即湧現龐大推力，面對台灣常見的山路陡坡、地下室螺旋陡升坡，油門輕點即步步為營，完全感受不到 2 噸多車重的沉重負擔。</li>
          <li><strong>長途巡航極致省油</strong>：Caddy Maxi 2.0 TDI 柴油平均油耗超過 20 km/L，加滿一桶油即可環島一圈還有餘裕。</li>
        </ul>
      </section>

      <section id="cost-comparison">
        <h2>4. 台灣每年稅金與長期養護成本對比</h2>
        <p>在台灣的汽機車稅制下：</p>
        <ul>
          <li><strong>2.5L 汽油/油電（如 Sienna）</strong>：排氣量 2487cc，落在 2401-3000cc 稅金級距，牌照稅 15,210 + 燃料費 7,200 = <strong>每年 22,410 元</strong>。</li>
          <li><strong>2.2L 柴油（如 Carnival）</strong>：排氣量 2151cc，柴油小客車牌照稅 11,230 + 燃料費 3,708 = <strong>每年僅需 14,938 元</strong>（每年省下 7,472 元）。</li>
          <li><strong>1.5T 汽油（如 Custin）</strong>：排氣量 1497cc，牌照稅 7,120 + 燃料費 4,800 = <strong>每年僅需 11,920 元</strong>。</li>
        </ul>
      </section>

      <section id="verdict">
        <h2>5. 結論：如何依據用車里程做決定？</h2>
        <p>請檢視你未來 5 年的駕駛習慣：</p>
        <ul>
          <li><strong>選油電（Hybrid）</strong>：若市區通勤接送比例佔 60% 以上，對怠速車室靜謐度有極高要求，且預算在 230 萬以上。</li>
          <li><strong>選柴油（Diesel）</strong>：若熱愛戶外露營、經常上山走非鋪裝陡坡，每年長途行駛里程在 1.5 萬至 2 萬公里以上，且希望節省年度稅費。</li>
          <li><strong>選小排量渦輪（Small Turbo）</strong>：若預算在 150 萬內，主要追求最高配備性價比與最低稅金負擔。</li>
        </ul>
      </section>
    `,
  },
];
