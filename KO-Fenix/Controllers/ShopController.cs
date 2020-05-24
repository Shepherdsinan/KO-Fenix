using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;

namespace KO_Fenix.Controllers
{
    public class ShopController : Controller
    {
        // GET: Shop
        kn_onlineEntities2 db = new kn_onlineEntities2();
        public ActionResult Resellers()
        {
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            return View();
            
        }
        public ActionResult Products()
        {
            
            return View();
        }
        public ActionResult Premiums()
        {
           
            return View();
        }
    }
}