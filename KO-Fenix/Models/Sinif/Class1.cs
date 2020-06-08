using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KO_Fenix.Models.Entity;
namespace KO_Fenix.Models.Sinif
{
    public class Class1
    {
        public IEnumerable<USERDATA> Deger1 {get; set;}
        public IEnumerable<USER_PERSONAL_RANK> Deger2 { get; set; }
        public IEnumerable<KNIGHTS> Deger3 { get; set; }
        public IEnumerable<CURRENTUSER> Deger4 { get; set; }
        public IEnumerable<C_NEWS> Deger5 { get; set; }
        public IEnumerable<C_DOWNLOADS> Deger6 { get; set; }
        public IEnumerable<USERDATA> Deger7 { get; set; }
        public IEnumerable<MyModel> Deger8 { get; set; }
        public IEnumerable<C_DESTEK> Deger9 { get; set; }
        public IEnumerable<ACCOUNT_CHAR> Deger10 { get; set; }
        public IEnumerable<C_DESTEKMESAJ> Deger11 { get; set; }
        public IEnumerable<DROP_MONSTER_ITEMDETAY> Deger12 { get; set; }
        public string strUserID { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string Messageanswer { get; set; }
        public int Ticketid { get; set; }
        
    }
}