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
    public class AdminController : Controller
    {
        // GET: Admin
        kn_onlineEntities2 db = new kn_onlineEntities2();
        Class1 cs = new Class1();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult login(TB_USER p)
        {
            var admindt = db.TB_USER.FirstOrDefault(x => x.strAccountID == p.strAccountID && x.Sifre == p.Sifre && x.bAuthority == 5);
            if (admindt != null)
            {
               FormsAuthentication.SetAuthCookie(admindt.strAccountID, false);                
               Session["strAccountID"] = admindt.strAccountID.ToString();
                return RedirectToAction("Panel", "Admin");
            }
            else
            {
                return RedirectToAction("Index", "Admin");
            }
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            return RedirectToAction("Index", "Admin");
        }
        [Authorize(Roles = "828164713")]
        public ActionResult panel()
        {
            return View();
        }
        [Authorize(Roles = "828164713")]
        public ActionResult ticketadmin()
        {
            return View();
        }
        [Authorize(Roles = "828164713")]
        public ActionResult duyuruadd()
        {
            return View();
        }
        [Authorize(Roles = "828164713")]
        public ActionResult gmsettings()
        {
            return View();
        }
        [Authorize(Roles = "828164713")]
        [HttpPost]
        public JsonResult ticketget()
        {
            var ticketdata = db.C_DESTEK;

            return Json(ticketdata, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "828164713")]               
        public ActionResult read(int id)
        {
            cs.Deger11 = (from a in db.C_DESTEKMESAJ where a.Ticketid == id select a).ToList();
            return View(cs);
        }
        [Authorize(Roles = "828164713")]
        [HttpPost]
        public ActionResult adminanswer(Class1 deger)
        {
            C_DESTEKMESAJ cevap = new C_DESTEKMESAJ();
            cevap.Ticketid = deger.Ticketid;
            cevap.StrUserID = deger.strUserID;
            cevap.Message = deger.Messageanswer;
            cevap.Senduser = "1";
            cevap.Date = DateTime.Now;
            db.C_DESTEKMESAJ.Add(cevap);
            var ktg = db.C_DESTEK.Find(deger.Ticketid);
            ktg.StrDurum = "1";
            db.SaveChanges();
            return RedirectToAction("Read", "Admin", new { @id = deger.Ticketid });
        }
        

    }
}