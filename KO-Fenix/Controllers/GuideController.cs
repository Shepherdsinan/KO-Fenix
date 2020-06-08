using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;
using KO_Fenix.Models.Sinif;
namespace KO_Fenix.Controllers
{
    public class GuideController : Controller
    {
        // GET: Guide
        kn_onlineEntities2 db = new kn_onlineEntities2();
        Class1 cs = new Class1();
        public ActionResult Upgrade()
        {
            
            return View();
        }
        public ActionResult Mining_Fishing()
        {
           
            return View();
        }
        public ActionResult Gem_Chest_Fragment()
        {
            return View();
        }
        public JsonResult itemexchangesearch(int id)
        {
            var deger = db.ITEM_EXCHANGE_ITEMDETAY.Where(x => x.itemnumber == id);            
            
            return Json(deger, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DropSearch()
        {
            return View();
        }
        
        public JsonResult DropSearchh(int id)
        {
            var deger = db.DROP_MONSTER_ITEMDETAY.Where(x => x.monster_id == id);

            return Json(deger, JsonRequestBehavior.AllowGet);
        }
        public JsonResult itemSearch(string id)
        {

            var itemqery = (from m in db.DROP_MONSTER_ITEMDETAY where m.strName.Contains(id)
                            group m by new { m.monster_name, m.monster_id, m.ZoneID } into g
                            orderby (g.Key.monster_id) ascending
                            select new
                            {
                                mon_id = g.Key.monster_id,
                                mon_name = g.Key.monster_name,
                                zon_id = g.Key.ZoneID,
                                mcount = g.Count()
                                
                            }); ; 

            return Json(itemqery, JsonRequestBehavior.AllowGet);
        }

        public JsonResult doldur()
        {

            var itemqery = (from m in db.DROP_MONSTER_ITEMDETAY                            
                            group m by new { m.monster_name, m.monster_id, m.ZoneID } into g
                            orderby (g.Key.monster_id) ascending
                            select new
                            {
                                mon_id = g.Key.monster_id,
                                mon_name = g.Key.monster_name,
                                zon_id = g.Key.ZoneID

                            }); 

            return Json(itemqery, JsonRequestBehavior.AllowGet);
        }

    }
}