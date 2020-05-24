using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using KO_Fenix.Models.Entity;
using KO_Fenix.Models.Sinif;

namespace KO_Fenix.Controllers
{
    public class HomeController : Controller
    {
        kn_onlineEntities2 db = new kn_onlineEntities2();
        Class1 cs = new Class1();
        // GET: Home
        public ActionResult Index()
        {
            cs.Deger5 = db.C_NEWS.OrderByDescending(x => x.id).ToList();
            //(from a in db.USERDATA where a.Authority == 1 orderby a.LoyaltyMonthly descending select a).Take(10).ToList();
            cs.Deger1 = db.USERDATA.Where(a => a.Authority == 1).OrderByDescending(b => b.Loyalty).Take(10).ToList();
            cs.Deger7 = db.USERDATA.Where(a => a.Authority == 1).OrderByDescending(b => b.LoyaltyMonthly).Take(10).ToList();
            cs.Deger2 = db.USER_PERSONAL_RANK.ToList();
            cs.Deger3 = db.KNIGHTS.ToList();
            var habersayisi = db.C_NEWS.Count();
            ViewBag.hbrsayi1 = habersayisi;
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            cs.Deger8 = (from k in db.KNIGHTS
                         join u in db.USERDATA on k.Chief equals u.strUserID
                         orderby (k.Points) descending
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
                         }).Take(10);
            return View(cs);
            

        }
        [HttpGet]
        public ActionResult Girisyap()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Girisyap(TB_USER p)
        {
            var bilgiler = db.TB_USER.FirstOrDefault(x => x.strAccountID == p.strAccountID && x.Sifre == p.Sifre);
            if (bilgiler != null)
            {
                FormsAuthentication.SetAuthCookie(bilgiler.strAccountID, false);
                Session["strAccountID"] = bilgiler.strAccountID.ToString();
                Session["CreateTime"] = bilgiler.CreateTime.ToString();
                Session["phone"] = bilgiler.Phone.ToString();
                Session["Email"] = bilgiler.Email.ToString();
                return RedirectToAction("Index", "Account");
            }
            else
            {
                return RedirectToAction("Index","Home");
            }
            
        }
        public ActionResult ForgotPassword()
        {
            return View();
        }

        
    }
}