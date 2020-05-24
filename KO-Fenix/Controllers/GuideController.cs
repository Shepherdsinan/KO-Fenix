using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;
namespace KO_Fenix.Controllers
{
    public class GuideController : Controller
    {
        // GET: Guide
        kn_onlineEntities2 db = new kn_onlineEntities2();
        public ActionResult Upgrade()
        {
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            return View();
        }
        public ActionResult Mining_Fishing()
        {
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            return View();
        }
        public ActionResult Gem_Chest_Fragment()
        {
            return View();
        }
        public ActionResult DropSearch()
        {
            return View();
        }
    }
}