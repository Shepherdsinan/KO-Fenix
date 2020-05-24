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
    
    public partial class GAME_SETTINGS
    {
        public byte ServerNo { get; set; }
        public byte MaxLevel { get; set; }
        public byte TownHPPercent { get; set; }
        public byte PlayerSaveInterval { get; set; }
        public byte Weather { get; set; }
        public short WeatherAmount { get; set; }
        public short ExpEventAmount { get; set; }
        public short CoinEventAmount { get; set; }
        public short NPEventAmount { get; set; }
        public short DropEventPercent { get; set; }
        public byte CSWResetOwnerStart { get; set; }
        public byte CSWMinimumClanGrade { get; set; }
        public byte CSWGetLoyaltySameNation { get; set; }
        public byte CSWMonumentHealing { get; set; }
        public byte CSWProtectAbyss { get; set; }
        public byte LoyaltySecurityDiameter { get; set; }
        public byte LoyaltySecurityMaxKillCount { get; set; }
        public byte UniqueDropNotice { get; set; }
        public byte UpgradeNotice { get; set; }
        public byte UpgradeNoticeNonRebirth { get; set; }
        public string MasterAccountPassword { get; set; }
        public byte LogDatabaseClearDay { get; set; }
        public byte OpenAllSkills { get; set; }
        public byte LuaCache { get; set; }
        public byte ShowCountryCode { get; set; }
        public byte LetterSystem { get; set; }
        public byte MannerSystem { get; set; }
        public byte UseChaosMap { get; set; }
        public byte PlayerMeleDamagePercent { get; set; }
        public byte PlayerElementalDamagePercent { get; set; }
        public byte UserMaxUpgradeCount { get; set; }
        public byte UserUpgradeSeconds { get; set; }
        public byte ChatBlockedWordSeconds { get; set; }
        public byte ChatBlockedFloodCount { get; set; }
        public byte ChatBlockedMuteMinute { get; set; }
        public Nullable<int> GameVersion { get; set; }
        public byte AutoMaster { get; set; }
        public byte AutoRegister { get; set; }
        public int LoseExp { get; set; }
        public int KillReward { get; set; }
        public byte OldBdw { get; set; }
    }
}