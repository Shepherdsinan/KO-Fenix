using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using KO_Fenix.Models.Entity;
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
        [Authorize]
        public ActionResult Passsend()
        {
            return View();
        }
        [Authorize]
        public ActionResult SealPasssend()
        {
            return View();
        }


    }
}