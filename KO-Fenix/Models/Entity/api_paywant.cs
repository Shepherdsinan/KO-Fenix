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
    
    public partial class api_paywant
    {
        public int ID { get; set; }
        public Nullable<int> SiparisID { get; set; }
        public Nullable<int> UserID { get; set; }
        public string ReturnData { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<byte> OdemeKanali { get; set; }
        public Nullable<float> OdemeTutari { get; set; }
        public Nullable<float> NetKazanc { get; set; }
        public string ExtraData { get; set; }
        public Nullable<int> Tarih { get; set; }
    }
}