//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KO_Fenix.Models.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class USER_PERSONAL_RANK
    {
        public short nRank { get; set; }
        public string strRankName { get; set; }
        public string strElmoUserID { get; set; }
        public string strElmoClanName { get; set; }
        public Nullable<short> sElmoKnights { get; set; }
        public Nullable<int> nElmoLoyaltyMonthly { get; set; }
        public string strKarusUserID { get; set; }
        public string strKarusClanName { get; set; }
        public Nullable<short> sKarusKnights { get; set; }
        public Nullable<int> nKarusLoyaltyMonthly { get; set; }
        public int nSalary { get; set; }
        public System.DateTime UpdateDate { get; set; }
    }
}