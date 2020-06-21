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
    
    
    public class AccountController : Controller
    {
        // GET: Account
        kn_onlineEntities2 db = new kn_onlineEntities2();
        
        [Authorize]
        public ActionResult Index()
        {
           
            return View();
        }
        [Authorize]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        public ActionResult PasswordChange()
        {
            return View();
        }
        [Authorize]
        public ActionResult SealPasswordChange()
        {
            return View();
        }
        [Authorize]
        public ActionResult Coupon()
        {
            return View();
        }       
       
        [HttpPost]
        public JsonResult Newpw(string username)
        {
            return Json(emailsender.kodGonder(username, "2", db) ? "1" : "0", JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult Newpwcommit(string kod, string pass, string passnew)
        {
            return Json(emailsender.newpasswork(kod,pass,passnew, 2, db) ? "1" : "0", JsonRequestBehavior.AllowGet);

        }

        
    }
}