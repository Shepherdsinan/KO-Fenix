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
                        orderby (k.Points) descending
                        select new MyModel()
                        {
                            Class=u.Class,
                            IDName=k.IDName,
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
    }
}