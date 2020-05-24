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
            
           
            cs.Deger1 = (from a in db.USERDATA where a.Authority == 1 orderby a.LoyaltyMonthly descending select a).ToList();
            cs.Deger2 = db.USER_PERSONAL_RANK.ToList();
            cs.Deger3 = db.KNIGHTS.ToList();
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            return View(cs);
        }
        
        public ActionResult ClanRankings()
        {
            //MyModel myModel = new MyModel();
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            IEnumerable<MyModel> myModel = (from k in db.KNIGHTS
                        join u in db.USERDATA on k.Chief equals u.strUserID
                        orderby (k.Ranking) ascending
                        select new MyModel()
                        {
                            Class=u.Class,
                            IDName=k.IDName,
                            IDNum = k.IDNum,
                            Nation=k.Nation,
                            Ranking=k.Ranking,
                            Members = k.Members,
                            Chief=k.Chief,
                            Points=k.Points
                        });            

            return View(myModel);
        }
        public ActionResult ForbidUsers()

        {
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            cs.Deger1 = (from a in db.USERDATA where a.Authority == 255  select a).ToList();
            cs.Deger3 = db.KNIGHTS.ToList();
            return View(cs);
        }
        public ActionResult KingSystem()
        {
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
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
            cs.Deger2 = db.USER_PERSONAL_RANK.ToList();
            cs.Deger3 = db.KNIGHTS.ToList();
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;

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
 
            var degerler = db.Database.ExecuteSqlCommand("Exec [ITEMLERI_BUL] @p0", id);
            degerler.ToString();

            return View(degerler);
        }

    }
}