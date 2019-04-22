//get language
var lang = getParameterByName('lang');

switch (lang) {

  case 'ja':
      window.dataSteps = {
          "steps": [
            {
                "First Name": "隆司",
                "Last Name": "井上",
                "Company Name": "東京千代田（株）",
                "Password": "財務部",
                "Address": "東京都",
                "Email": "takashi.j@itsolutions.co.uk",
                "Phone Number": 40791345621
            },
            {
                "First Name": "信弘",
                "Last Name": "佐藤",
                "Company Name": "（株）北海札幌",
                "Password": "人事部",
                "Address": "北海道",
                "Email": "s.shin@mc.com",
                "Phone Number": 40722345600
            },
            {
                "First Name": "美佐子",
                "Last Name": "林",
                "Company Name": "九州福岡（株）",
                "Password": "情報部",
                "Address": "福岡",
                "Email": "misa.hayashi@waterfront.com",
                "Phone Number": 40735416854
            },
            {
                "First Name": "理恵子",
                "Last Name": "花田",
                "Company Name": "（株）香川松山",
                "Password": "営業",
                "Address": "香川",
                "Email": "h.rie@mc.com",
                "Phone Number": 40733652145
            },
            {
                "First Name": "りさ",
                "Last Name": "佐藤",
                "Company Name": "（株）大阪難波",
                "Password": "ITソリューション",
                "Address": "大阪",
                "Email": "r-sato@timepath.co.uk",
                "Phone Number": 40799885412
            },
            {
                "First Name": "優斗",
                "Last Name": "町田",
                "Company Name": "愛知名古屋（株）",
                "Password": "代理店",
                "Address": "名古屋",
                "Email": "you.mati@aperture.us",
                "Phone Number": 40733154268
            },
            {
                "First Name": "ハマー",
                "Last Name": "高橋",
                "Company Name": "（株）秋田海産",
                 "Password": "アドバイザー",
                "Address": "秋田",
                "Email": "h.hama@sugarwell.org",
                "Phone Number": 40712462257
            },
            {
                "First Name": "ロドリゲス",
                "Last Name": "シェルビー",
                "Company Name": "（株）富山商店",
                 "Password": "業務部",
                "Address": "富山",
                "Email": "s-rodo@aperture.us",
                "Phone Number": 40731254562
            },
            {
                "First Name": "美恵",
                "Last Name": "那須",
                "Company Name": "（株）高知松山",
                 "Password": "総務部",
                "Address": "高知",
                "Email": "na_emi@techdev.com",
                "Phone Number": 40741785214
            },
            {
                "First Name": "パーマー",
                "Last Name": "ララ",
                "Company Name": "（株）長野信越",
                 "Password": "情報システム",
                "Address": "長野",
                "Email": "rara.p@timepath.co.uk",
                "Phone Number": 40731653845
            }
          ]
      };
    break;
  default:
      window.dataSteps = {
          "steps": [
              {
                  "First Name": "John",
                  "Last Name": "Smith",
                  "Company Name": "IT Solutions",
                  "Password": "Analyst",
                  "Address": "98 North Road",
                  "Email": "jsmith@itsolutions.co.uk",
                  "Phone Number": 40716543298
              },
              {
                  "First Name": "Jane",
                  "Last Name": "Dorsey",
                  "Company Name": "MediCare",
                  "Password": "Medical Engineer",
                  "Address": "11 Crown Street",
                  "Email": "jdorsey@mc.com",
                  "Phone Number": 40791345621
              },
              {
                  "First Name": "Albert",
                  "Last Name": "Kipling",
                  "Company Name": "Waterfront",
                  "Password": "Accountant",
                  "Address": "22 Guild Street",
                  "Email": "kipling@waterfront.com",
                  "Phone Number": 40735416854
              },
              {
                  "First Name": "Michael",
                  "Last Name": "Robertson",
                  "Company Name": "MediCare",
                  "Password": "IT Specialist",
                  "Address": "17 Farburn Terrace",
                  "Email": "mrobertson@mc.com",
                  "Phone Number": 40733652145
              },
              {
                  "First Name": "Doug",
                  "Last Name": "Derrick",
                  "Company Name": "Timepath Inc.",
                  "Password": "Analyst",
                  "Address": "99 Shire Oak Road",
                  "Email": "dderrick@timepath.co.uk",
                  "Phone Number": 40799885412
              },
              {
                  "First Name": "Jessie",
                  "Last Name": "Marlowe",
                  "Company Name": "Aperture Inc.",
                  "Password": "Scientist",
                  "Address": "27 Cheshire Street",
                  "Email": "jmarlowe@aperture.us",
                  "Phone Number": 40733154268
              },
              {
                  "First Name": "Stan",
                  "Last Name": "Hamm",
                  "Company Name": "Sugarwell",
                  "Password": "Advisor",
                  "Address": "10 Dam Road",
                  "Email": "shamm@sugarwell.org",
                  "Phone Number": 40712462257
              },
              {
                  "First Name": "Michelle",
                  "Last Name": "Norton",
                  "Company Name": "Aperture Inc.",
                  "Password": "Scientist",
                  "Address": "13 White Rabbit Street",
                  "Email": "mnorton@aperture.us",
                  "Phone Number": 40731254562
              },
              {
                  "First Name": "Stacy",
                  "Last Name": "Shelby",
                  "Company Name": "TechDev",
                  "Password": "HR Manager",
                  "Address": "19 Pineapple Boulevard",
                  "Email": "sshelby@techdev.com",
                  "Phone Number": 40741785214
              },
              {
                  "First Name": "Lara",
                  "Last Name": "Palmer",
                  "Company Name": "Timepath Inc.",
                  "Password": "Programmer",
                  "Address": "87 Orange Street",
                  "Email": "lpalmer@timepath.co.uk",
                  "Phone Number": 40731653845
              }
          ]
      };
    break;
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
	};
