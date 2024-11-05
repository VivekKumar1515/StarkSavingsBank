package com.winterfell.enums;

public enum CardType {
    CROWN_JEWELS_CARD,
    DRAGONS_HOARD,
    DIREWOLF_PROTECTOR,
    RAVEN_EXPRESS,
    WINTERS_RESERVE,
    WARDENS_VAULT,
    HAND_OF_THE_KING,
    KNIGHTS_OATH,
    MAESTERS_WISDOM,
    HEARTHFIRE_CARD;

    @Override
    public String toString() {
        switch (this) {
            case CROWN_JEWELS_CARD: return "Crown Jewels Card – Exclusive access for royalty and nobles.";
            case DRAGONS_HOARD: return "Dragon's Hoard – High-value premium card with unmatched benefits.";
            case DIREWOLF_PROTECTOR: return "Direwolf Protector – A card with strong security features.";
            case RAVEN_EXPRESS: return "Raven Express – A swift and efficient card for quick transactions.";
            case WINTERS_RESERVE: return "Winter’s Reserve – Special card with seasonal bonuses.";
            case WARDENS_VAULT: return "Warden’s Vault – Card offering superior safety and protection.";
            case HAND_OF_THE_KING: return "Hand of the King – Prestige card for high-ranking clients.";
            case KNIGHTS_OATH: return "Knight’s Oath – Loyalty rewards card with perks for frequent users.";
            case MAESTERS_WISDOM: return "Maester’s Wisdom – A financial advisory card with educational resources.";
            case HEARTHFIRE_CARD: return "Hearthfire Card – A community-based card with benefits for family needs.";
            default: return super.toString();
        }
    }
}
