using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;

namespace KO_Fenix.Controllers
{
    public class SharedController : Controller
    {
        // GET: Shared
        kn_onlineEntities2 db = new kn_onlineEntities2();
        
        public ActionResult _Layout()
        {
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery; 
            return View();
        }
        public ActionResult __Layout()
        {
            return View();
        }
    }
}