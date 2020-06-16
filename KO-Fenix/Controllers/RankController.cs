using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;
using KO_Fenix.Models.Sinif;




namespace KO_Fenix.Controllers
{
    public class RankController : Controller
    {
        // GET: Rank
        kn_onlineEntities2 db = new kn_onlineEntities2();
        Class1 cs = new Class1();
        public ActionResult UserRankings()
        {                        
            //var query = (from a in db.USERDATA where a.Authority == 1 orderby a.Loyalty descending select a).ToList();
            
           
            //cs.Deger1 = (from a in db.USERDATA where a.Authority == 1 orderby a.LoyaltyMonthly descending select a).ToList();
            //cs.Deger2 = db.USER_PERSONAL_RANK.ToList();
            //cs.Deger3 = db.KNIGHTS.ToList();
            
            return View();
        }

        public JsonResult UserRankingsdata(int id)
        {
            
            if (id == 0)
            {
                var userdatjsn0 = (from u in db.USERDATA
                                  join k in db.KNIGHTS on u.ClanID equals k.IDNum
                                  into t
                                  from subsorgu in t.DefaultIfEmpty()
                                  where u.Authority == 1
                                  orderby (u.Loyalty) descending
                                  select new
                                  {
                                      u.Nation,
                                      u.Class,
                                      u.strUserID,
                                      u.Level,
                                      u.Loyalty,
                                      u.LoyaltyMonthly,
                                      Ranking = subsorgu.Ranking.ToString(),
                                      IDNum = subsorgu.IDNum.ToString(),
                                      IDName = subsorgu.IDName.ToString()
                                  });
                return Json(userdatjsn0, JsonRequestBehavior.AllowGet);
            }
            
            
            var userdatjsn1 = (from u in db.USERDATA
                              join k in db.KNIGHTS on u.ClanID equals k.IDNum                              
                              into t from subsorgu in t.DefaultIfEmpty()
                              where u.Authority == 1
                              orderby (u.LoyaltyMonthly) descending
                              select new
                              {
                                  u.Nation,u.Class,u.strUserID,u.Level,u.Loyalty,u.LoyaltyMonthly,
                                  Ranking = subsorgu.Ranking.ToString(),
                                  IDNum= subsorgu.IDNum.ToString(),
                                  IDName= subsorgu.IDName.ToString()
                              });
            return Json(userdatjsn1, JsonRequestBehavior.AllowGet);



        }

        public JsonResult ClanRankingsdata(int id)
        {

            //0 sa tüm veri
            if (id == 0)
            {
                var myModelall = (from k in db.KNIGHTS
                               join u in db.USERDATA on k.Chief equals u.strUserID                               
                               orderby (k.Ranking) ascending
                               select new MyModel()
                               {
                                   Class = u.Class,
                                   IDName = k.IDName,
                                   IDNum = k.IDNum,
                                   Nation = k.Nation,
                                   Ranking = k.Ranking,
                                   Members = k.Members,
                                   Chief = k.Chief,
                                   Points = k.Points
                               });
                return Json(myModelall, JsonRequestBehavior.AllowGet);
            }
            //1 ve 2 de yeni veri çek
            else
            {
                var myModel = (from k in db.KNIGHTS
                               join u in db.USERDATA on k.Chief equals u.strUserID
                               where u.Nation == id
                               orderby (k.Ranking) ascending
                               select new MyModel()
                               {
                                   Class = u.Class,
                                   IDName = k.IDName,
                                   IDNum = k.IDNum,
                                   Nation = k.Nation,
                                   Ranking = k.Ranking,
                                   Members = k.Members,
                                   Chief = k.Chief,
                                   Points = k.Points
                               });
                return Json(myModel, JsonRequestBehavior.AllowGet);
            }
            
        }


        public ActionResult ClanRankings()
        {
            return View();
        }
        public ActionResult ForbidUsers()

        {
           
            cs.Deger1 = (from a in db.USERDATA where a.Authority == 255  select a).ToList();
            cs.Deger3 = db.KNIGHTS.ToList();
            return View(cs);
        }
        public ActionResult KingSystem()
        {
            return View();
        }
        public ActionResult ClanProfile(int id)
        {
            var query = db.KNIGHTS.FirstOrDefault(x => x.IDNum == id);
            ViewBag.klanadi = query.IDName;
            ViewBag.Chief = query.Chief;
            ViewBag.ViceChief_1 = query.ViceChief_1;
            ViewBag.ViceChief_2 = query.ViceChief_2;
            ViewBag.Members = query.Members;
            ViewBag.Ranking = query.Ranking;
            cs.Deger1 = (from a in db.USERDATA where a.Authority == 1 && a.ClanID == id orderby a.Loyalty descending select a).ToList();
            
            cs.Deger3 = db.KNIGHTS.ToList();
            
            return View(cs);
        }
        public ActionResult UserProfile(string id)
        {
            
            var queryusr = db.USERDATA.FirstOrDefault(x => x.strUserID == id);            
            ViewBag.Hp = queryusr.Hp;
            ViewBag.Mp = queryusr.Mp;
            ViewBag.strUserID = queryusr.strUserID;
            ViewBag.Class = queryusr.Class;
            ViewBag.Level = queryusr.Level;
            ViewBag.nation = queryusr.Nation; 
            ViewBag.Exp = queryusr.Exp;
            ViewBag.Points = queryusr.Points;
            ViewBag.Str = queryusr.Strong;
            ViewBag.Sta = queryusr.Sta;
            ViewBag.Dex = queryusr.Dex;
            ViewBag.Cha = queryusr.Cha;
            ViewBag.intel = queryusr.Intel;
            ViewBag.Loyalty = queryusr.Loyalty;

            var levelupexp = db.LEVEL_UP.FirstOrDefault(x => x.level == queryusr.Level);
            ViewBag.levelupexp = levelupexp.Exp;
 
            db.Database.ExecuteSqlCommand("Exec [sp_ITEM_INFO] @p0", id.Trim());

            var qery = db.USER_ITEM_INFO.Where(x => x.stacksize != 0 & x.strUserId == id.Trim()).ToList();

            return View(qery);
        }

    }
}