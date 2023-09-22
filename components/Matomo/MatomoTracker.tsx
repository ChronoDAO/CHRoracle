"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    _paq: any[];
  }
}

const MatomoTracker: React.FC = () => {
  useEffect(() => {
    // Initialisation du tableau _paq si ce n'est pas déjà fait
    window._paq = window._paq || [];

    // Ajout des méthodes de suivi standard
    window._paq.push(["trackPageView"]);
    window._paq.push(["enableLinkTracking"]);

    // Création et insertion du script de suivi
    const u = "http://localhost/matomo/"; // Remplacez par l'URL de votre instance Matomo
    window._paq.push(["setTrackerUrl", u + "matomo.php"]);
    window._paq.push(["setSiteId", "1"]); // Remplacez par l'ID de votre site dans Matomo

    const scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.src = u + "matomo.js";
    document.head.appendChild(scriptElement);
  }, []);

  return null;
};

export default MatomoTracker;
