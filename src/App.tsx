import "./App.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import type { FormEvent, MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { Dayjs } from "dayjs";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  InputAdornment,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import { isAxiosError } from "axios";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import SellIcon from "@mui/icons-material/Sell";
import HomeIcon from "@mui/icons-material/Home";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import Groups2Icon from "@mui/icons-material/Groups2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SearchIcon from "@mui/icons-material/Search";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "./assets/logo1.jpeg";
import hero1 from "./assets/hero/banner-1.jpg";
import hero2 from "./assets/hero/banner-2.jpg";
import hero3 from "./assets/hero/banner-3.jpg";
import hero4 from "./assets/hero/banner-4.jpg";
import hero5 from "./assets/hero/banner-5.jpg";
import { api } from "./api";

type Role = "super_admin" | "admin" | "agent" | "customer";
type DrawerMode = "login" | "signup" | "profile" | null;
type AlertSeverity = "success" | "error";

type User = {
  id: number;
  email: string;
  phone_number?: string | null;
  role: Role;
  status: string;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
  profile_picture?: string | null;
  address?: string | null;
  district?: string | null;
  village?: string | null;
  experience?: string | null;
  sales_closed?: number;
  nationality?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  district: string;
  city?: string | null;
  category: string;
  size_text?: string | null;
  purpose?: string | null;
  status: string;
  is_featured: boolean;
  total_views: number;
  owner_id: number;
  created_at: string;
  thumbnail_url?: string | null;
};

type DashboardStats = {
  total_listings: number;
  approved_listings: number;
  rejected_listings: number;
  total_views: number;
  total_sales: number;
  pending_agents: number;
  total_agents: number;
  total_wishes: number;
  total_site_visits: number;
  total_offers: number;
};

type BonusSection = {
  heading: string;
  body: string;
};

type HeroSlide = {
  id: number;
  title: string;
  subtitle?: string | null;
  image_url: string;
};

type ListingViewResponse = {
  listing_id: number;
  total_views: number;
  counted: boolean;
};

type Wish = {
  id: number;
  title: string;
  description: string;
  purpose?: string | null;
  district?: string | null;
  size_range?: string | null;
  customer_name: string;
  customer_email: string;
  customer_mobile_number: string;
  status: string;
  created_at?: string;
};

type Offer = {
  id: number;
  amount: number;
  full_name: string;
  mobile_number: string;
  email: string;
  status: string;
  listing_id: number;
  created_at?: string;
};

type SiteVisit = {
  id: number;
  listing_id: number;
  customer_name: string;
  customer_email: string;
  customer_mobile_number: string;
  scheduled_date: string;
  scheduled_time: string;
  message?: string | null;
  status: string;
  created_at?: string;
};

type AuditLog = {
  id: number;
  action: string;
  entity_type: string;
  description: string;
  created_at: string;
};

type FormAlertState = {
  open: boolean;
  severity: AlertSeverity;
  message: string;
};

const AUTH_STORAGE_KEY = "sam_auth_user";
const DASHBOARD_MENU_STORAGE_KEY = "sam_dashboard_menu";
const HOME_LISTINGS_BATCH_SIZE = 3;
const LISTINGS_BATCH_SIZE = 6;
const AGENTS_BATCH_SIZE = 8;

const imageMap: Record<string, string> = {
  "/src/assets/hero/banner-1.jpg": hero1,
  "/src/assets/hero/banner-2.jpg": hero2,
  "/src/assets/hero/banner-3.jpg": hero3,
  "/src/assets/hero/banner-4.jpg": hero4,
  "/src/assets/hero/banner-5.jpg": hero5,
};

const fallbackHero: HeroSlide[] = [
  {
    id: 1,
    title: "Exceptional properties",
    subtitle: "Trusted land opportunities",
    image_url: "/src/assets/hero/banner-1.jpg",
  },
  {
    id: 2,
    title: "Verified listings",
    subtitle: "Clear ownership and direct access",
    image_url: "/src/assets/hero/banner-2.jpg",
  },
  {
    id: 3,
    title: "Professional support",
    subtitle: "Consulting, surveys and due diligence",
    image_url: "/src/assets/hero/banner-3.jpg",
  },
];

const fallbackBonus: BonusSection[] = [
  {
    heading: "Why use SAM.UG?",
    body: "SAM.UG protects buyers and sellers through transparent listing standards, direct owner connections, and due diligence support.",
  },
  {
    heading: "How to Use My Wish",
    body: "Share your dream property and the team follows up with curated suggestions before public release.",
  },
];

const adminMenu = [
  "Listings",
  "Agents",
  "Wishes",
  "Site Visits",
  "Offers",
  "Reports",
];
const superAdminMenu = [...adminMenu, "Audit logs", "Settings"];
const dashboardMenuIcons: Record<string, ReactNode> = {
  Listings: <HomeWorkIcon fontSize="small" />,
  Agents: <Groups2Icon fontSize="small" />,
  Wishes: <FavoriteIcon fontSize="small" />,
  "Site Visits": <EventAvailableIcon fontSize="small" />,
  Offers: <LocalOfferIcon fontSize="small" />,
  Reports: <DescriptionIcon fontSize="small" />,
  "Audit logs": <ReceiptLongIcon fontSize="small" />,
  Settings: <SettingsIcon fontSize="small" />,
  "My Listings": <HomeWorkIcon fontSize="small" />,
  Analytics: <AnalyticsIcon fontSize="small" />,
  Profile: <PersonOutlineOutlinedIcon fontSize="small" />,
};

const defaultAgentThumbnails = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
];

function resolveImage(path?: string | null) {
  if (!path) return hero4;
  return imageMap[path] ?? path;
}

function resolveAgentImage(path?: string | null, seed = 0) {
  if (path) return path;
  return defaultAgentThumbnails[seed % defaultAgentThumbnails.length];
}

function formatPrice(value: number) {
  return `UGX ${new Intl.NumberFormat("en-UG", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

function formatTimeSincePosted(value: string) {
  const postedAt = new Date(value).getTime();
  const diffMinutes = Math.max(1, Math.floor((Date.now() - postedAt) / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffWeeks = Math.floor(diffHours / 168);
  if (diffWeeks < 4) {
    return `${Math.max(1, diffWeeks)} week${diffWeeks === 1 ? "" : "s"} ago`;
  }

  const diffMonths = Math.floor(diffHours / 720);
  if (diffMonths < 12) {
    return `${Math.max(1, diffMonths)} month${diffMonths === 1 ? "" : "s"} ago`;
  }

  const diffYears = Math.floor(diffHours / 8760);
  return `${Math.max(1, diffYears)} year${diffYears === 1 ? "" : "s"} ago`;
}

function formatMemberDuration(value?: string) {
  if (!value) return "Member for recently joined";
  return `Joined ${formatTimeSincePosted(value)}`;
}

function ListingCard({
  listing,
  onOpenSiteVisit,
  onOpenOffer,
  onRegisterView,
}: {
  listing: Listing;
  onOpenSiteVisit: (listing: Listing) => void;
  onOpenOffer: (listing: Listing) => void;
  onRegisterView: (listingId: number) => void;
}) {
  return (
    <Card
      className="listing-card"
      elevation={2}
      onClickCapture={() => onRegisterView(listing.id)}
      sx={{
        border: "1px solid rgba(17,17,17,0.08)",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {listing.status.toLowerCase() === "sold" ? (
        <div className="listing-sold-ribbon">Sold</div>
      ) : null}
      <CardMedia
        component="img"
        height="220"
        image={resolveImage(listing.thumbnail_url)}
        alt={listing.title}
      />
      <CardContent sx={{ display: "grid", gap: 1.5 }}>
        <div className="listing-top-row">
          <Chip
            label={listing.purpose ?? listing.category}
            color="primary"
            size="small"
          />
          <Chip
            label={formatPrice(listing.price)}
            variant="outlined"
            color="secondary"
            size="small"
          />
          <Chip
            label={`${listing.total_views} views`}
            size="small"
            className="listing-views-button"
            icon={<VisibilityOutlinedIcon fontSize="small" />}
          />
        </div>
        <Typography variant="h5">{listing.title}</Typography>
        <Divider />
        <Typography variant="body1" color="text.secondary">
          {listing.description}
        </Typography>
        <div className="listing-meta-row">
          <Typography
            variant="body2"
            className="listing-meta-item"
            color="text.secondary"
          >
            <PlaceOutlinedIcon fontSize="inherit" />
            {listing.district}
            {listing.city ? `, ${listing.city}` : ""}
            {listing.size_text ? ` | ${listing.size_text}` : ""}
          </Typography>
          <Typography
            variant="body2"
            className="listing-meta-item"
            color="text.secondary"
          >
            <AccessTimeOutlinedIcon fontSize="inherit" />
            {formatTimeSincePosted(listing.created_at)}
          </Typography>
        </div>
        <div className="listing-actions-row">
          <div className="listing-actions-buttons">
            <Button
              variant="contained"
              size="small"
              onClick={() => onOpenOffer(listing)}
            >
              Give an Offer
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onOpenSiteVisit(listing)}
            >
              Site Visit
            </Button>
            <Button variant="outlined" size="small">
              Full Article
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ListingCardLoader({
  count,
  className,
}: {
  count: number;
  className: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <Paper key={index} className="listing-loader-card">
          <CircularProgress
            aria-label="LoadingÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦"
            color="warning"
          />
        </Paper>
      ))}
    </div>
  );
}

function PageLoader() {
  return (
    <Box className="page-loader-shell">
      <div className="page-loader-plain">
        <CircularProgress
          aria-label="LoadingÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦"
          color="warning"
        />
      </div>
    </Box>
  );
}

type HomePageProps = {
  featuredListings: Listing[];
  latestListings: Listing[];
  heroSlides: HeroSlide[];
  listingsLoading: boolean;
  homeListingsTab: "featured" | "all";
  filters: {
    district: string;
    minPrice: string;
    maxPrice: string;
  };
  slideIndex: number;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      district: string;
      minPrice: string;
      maxPrice: string;
    }>
  >;
  setHomeListingsTab: React.Dispatch<
    React.SetStateAction<"featured" | "all">
  >;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  handleFilterSubmit: (event: FormEvent) => void;
  showPreviousSlide: () => void;
  showNextSlide: () => void;
  onOpenWish: () => void;
  onOpenSiteVisit: (listing: Listing) => void;
  onOpenOffer: (listing: Listing) => void;
  onRegisterView: (listingId: number) => void;
};

function HomePage({
  featuredListings,
  latestListings,
  heroSlides,
  listingsLoading,
  homeListingsTab,
  filters,
  slideIndex,
  setFilters,
  setHomeListingsTab,
  setSlideIndex,
  handleFilterSubmit,
  showPreviousSlide,
  showNextSlide,
  onOpenWish,
  onOpenSiteVisit,
  onOpenOffer,
  onRegisterView,
}: HomePageProps) {
  const homeListingsSectionRef = useRef<HTMLDivElement | null>(null);
  const activeSlide = heroSlides[slideIndex] ?? fallbackHero[0];
  const [visibleHomeListingsCount, setVisibleHomeListingsCount] = useState(
    HOME_LISTINGS_BATCH_SIZE,
  );
  const featuredHomeListings = featuredListings.filter(
    (listing) => listing.is_featured,
  );
  const allHomeListings = Array.from(
    new Map(
      [...latestListings, ...featuredListings].map((listing) => [
        listing.id,
        listing,
      ]),
    ).values(),
  );
  const homeSourceListings =
    homeListingsTab === "featured" ? featuredHomeListings : allHomeListings;
  const visibleHomeListings = homeSourceListings.slice(0, visibleHomeListingsCount);

  useEffect(() => {
    setVisibleHomeListingsCount(HOME_LISTINGS_BATCH_SIZE);
  }, [homeListingsTab, featuredHomeListings.length, allHomeListings.length]);

  useEffect(() => {
    const target = homeListingsSectionRef.current;
    if (!target || listingsLoading || homeSourceListings.length <= visibleHomeListingsCount) {
      return;
    }

    const maybeLoadMore = () => {
      const rect = target.getBoundingClientRect();
      if (rect.bottom - window.innerHeight > 220) return;

      setVisibleHomeListingsCount((current) => {
        if (current >= homeSourceListings.length) {
          return current;
        }
        return Math.min(
          current + HOME_LISTINGS_BATCH_SIZE,
          homeSourceListings.length,
        );
      });
    };

    maybeLoadMore();
    window.addEventListener("scroll", maybeLoadMore, { passive: true });
    window.addEventListener("resize", maybeLoadMore);
    return () => {
      window.removeEventListener("scroll", maybeLoadMore);
      window.removeEventListener("resize", maybeLoadMore);
    };
  }, [homeSourceListings.length, listingsLoading, visibleHomeListingsCount]);

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper
          key={activeSlide.id}
          className="hero-slide hero-slide-fade"
          sx={{
            backgroundImage: `url(${resolveImage(activeSlide.image_url)})`,
          }}
        >
          <div className="hero-copy">
            <Chip
              icon={<AutoAwesomeOutlinedIcon />}
              label="Trusted land marketing platform"
              sx={{
                width: "fit-content",
                bgcolor: "rgba(255,255,255,0.18)",
                color: "#fff",
              }}
            />
            <Typography
              variant="h1"
              sx={{ color: "#fff", fontSize: { xs: 44, md: 78 } }}
            >
              Exceptional properties with transparent land support.
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: { xs: 18, md: 22 } }}>
              {activeSlide.subtitle ||
                "Tap Your Wish to tell us about your dream property to get exclusive suggestions before they are published."}
            </Typography>
            <div className="action-row">
              <Button variant="contained" size="large" onClick={onOpenWish}>
                Your Wish
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.65)" }}
              >
                Explore Listings
              </Button>
            </div>
          </div>
          <Card elevation={0} className="hero-overlay-card">
            <CardContent>
              <Chip
                label="Exceptional properties"
                color="primary"
                sx={{ mb: 1.5 }}
              />
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                Tap Your Wish to tell us about your dream property.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }} variant="body1">
                Get exclusive suggestions before they are published and let the
                SAM team source opportunities for you.
              </Typography>
              <Button
                variant="contained"
                color="warning"
                endIcon={<CallMadeOutlinedIcon />}
                onClick={onOpenWish}
              >
                Your Wish
              </Button>
            </CardContent>
          </Card>
          <div className="hero-dots" aria-label="Slide indicators">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`hero-dot${index === slideIndex ? " hero-dot-active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={index === slideIndex}
                onClick={() => setSlideIndex(index)}
              />
            ))}
          </div>
          <div className="hero-controls">
            <div className="hero-nav-buttons">
              <button
                type="button"
                className="hero-nav-button"
                aria-label="Previous slide"
                onClick={showPreviousSlide}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className="hero-nav-button"
                aria-label="Next slide"
                onClick={showNextSlide}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </Paper>
      </Container>

      <Container maxWidth="xl">
        <Paper
          component="form"
          onSubmit={handleFilterSubmit}
          className="filter-card"
        >
          <Box className="filter-intro">
            <Typography className="filter-intro-title">
              Find your property
            </Typography>
            <Typography className="filter-intro-copy">
              Search by district or price
            </Typography>
          </Box>
          <TextField
            size="small"
            label="District"
            value={filters.district}
            onChange={(event) =>
              setFilters({ ...filters, district: event.target.value })
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            size="small"
            label="Min price"
            value={filters.minPrice}
            onChange={(event) =>
              setFilters({ ...filters, minPrice: event.target.value })
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">UGX</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            size="small"
            label="Max price"
            value={filters.maxPrice}
            onChange={(event) =>
              setFilters({ ...filters, maxPrice: event.target.value })
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">UGX</InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit" variant="contained" size="large">
            Search
          </Button>
        </Paper>
      </Container>

      <Container maxWidth="xl" sx={{ pt: 8, pb: 1 }}>
        <section ref={homeListingsSectionRef}>
          <Paper className="home-listings-table-shell">
            <Tabs
              value={homeListingsTab}
              onChange={(_, value: "featured" | "all") =>
                setHomeListingsTab(value)
              }
              textColor="primary"
              indicatorColor="primary"
              sx={{ px: 2, pt: 2, mb: 3 }}
            >
              <Tab value="featured" label="Featured for You" />
              <Tab value="all" label="All" />
            </Tabs>
            {listingsLoading ? (
              <ListingCardLoader count={4} className="home-listing-grid" />
            ) : (
              <>
                {homeListingsTab === "featured" ? (
                  visibleHomeListings.length ? (
                    <div
                      key="featured-home-listings"
                      className="home-listing-grid home-listings-tab-content"
                    >
                      {visibleHomeListings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          onOpenSiteVisit={onOpenSiteVisit}
                          onOpenOffer={onOpenOffer}
                          onRegisterView={onRegisterView}
                        />
                      ))}
                    </div>
                  ) : (
                    <Box className="dashboard-empty-state">
                      <Typography variant="h6">No listings available.</Typography>
                      <Typography color="text.secondary">
                        There are no featured listings to show right now.
                      </Typography>
                    </Box>
                  )
                ) : (
                  visibleHomeListings.length ? (
                    <div
                      key="all-home-listings"
                      className="home-listing-grid home-listings-tab-content"
                    >
                      {visibleHomeListings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          onOpenSiteVisit={onOpenSiteVisit}
                          onOpenOffer={onOpenOffer}
                          onRegisterView={onRegisterView}
                        />
                      ))}
                    </div>
                  ) : (
                    <Box className="dashboard-empty-state">
                      <Typography variant="h6">No listings available.</Typography>
                      <Typography color="text.secondary">
                        There are no listings matching the current filters.
                      </Typography>
                    </Box>
                  )
                )}
                {homeSourceListings.length > visibleHomeListings.length ? (
                  <Box className="dashboard-load-more-trigger">
                    <CircularProgress size={24} color="warning" />
                  </Box>
                ) : null}
              </>
            )}
          </Paper>
        </section>
      </Container>
    </>
  );
}

function AboutPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <section className="page-hero">
        <Chip label="About SAM.UG" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h2" sx={{ mb: 2 }}>
          Who we are
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900 }}>
          SAM.UG is a modern and trusted land marketing platform powered by
          Solvent Asset Management, created to simplify and improve the way land
          is bought and sold through transparency, professionalism and direct
          connections.
        </Typography>
      </section>

      <section className="section-gap two-column">
        <Card elevation={0} className="feature-panel">
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Our Values
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              We build trust through clear principles and exceptional service.
              These pillars shape every decision, interaction and product we
              deliver.
            </Typography>
            <div className="stats-grid">
              <Paper className="stat-card">
                <Typography variant="h4" color="primary.main">
                  10k+
                </Typography>
                <Typography color="text.secondary">
                  Satisfied customers
                </Typography>
              </Paper>
              <Paper className="stat-card">
                <Typography variant="h4" color="primary.main">
                  12
                </Typography>
                <Typography color="text.secondary">
                  Years of experience
                </Typography>
              </Paper>
              <Paper className="stat-card">
                <Typography variant="h4" color="primary.main">
                  24h
                </Typography>
                <Typography color="text.secondary">Avg response</Typography>
              </Paper>
            </div>
            <div className="listing-grid">
              {[
                "Personalization",
                "Integrity",
                "Time and Effort",
                "Empathy",
                "Exceptional Customer Experience",
                "Resolution",
              ].map((item) => (
                <Paper key={item} className="text-panel">
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>
                    {item}
                  </Typography>
                  <Typography color="text.secondary">
                    We use {item.toLowerCase()} to shape trustworthy property
                    experiences.
                  </Typography>
                </Paper>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="side-column">
          <Paper className="text-panel">
            <Typography variant="h5" sx={{ mb: 2 }}>
              Who we serve
            </Typography>
            <div className="chip-row">
              {[
                "Landlords",
                "Kibanja Owners",
                "Tenants",
                "Brokers",
                "Service Providers",
              ].map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
          </Paper>
          <Paper className="text-panel">
            <Typography variant="h5" sx={{ mb: 2 }}>
              Impact snapshot
            </Typography>
            <Typography color="text.secondary">
              98% satisfaction and 24h average response, driven by faster
              resolutions and reduced friction.
            </Typography>
          </Paper>
        </div>
      </section>

      <section className="section-gap two-column">
        <Paper className="text-panel">
          <Typography variant="h3" sx={{ mb: 2 }}>
            Mission & Vision
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            We connect people to land and buildings with professionalism,
            empathy and measurable value.
          </Typography>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>Mission</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            To be a nationwide link of peace between landlords and Kibanja
            owners, landlords and tenants, and investors.
          </Typography>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>Vision</Typography>
          <Typography color="text.secondary">
            To bridge the gap in professionalism across asset management,
            raising standards and delivering consistent outcomes.
          </Typography>
        </Paper>
        <Paper className="text-panel">
          <Typography variant="h3" sx={{ mb: 2 }}>
            Our Objectives
          </Typography>
          <div className="bullet-list">
            {[
              "Resolve landlord-tenant conflicts",
              "Promote peaceful coexistence",
              "Facilitate peaceful family land use",
              "Enable financial access and simplify sales",
            ].map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Clear, practical objectives that reduce conflict, unlock value and
            make land ownership secure and usable for families, investors and
            communities.
          </Typography>
        </Paper>
      </section>
    </Container>
  );
}

function ContactPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <section className="page-hero">
        <Chip label="Get in touch" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h2" sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900 }}>
          We're here to help with surveys, disputes, succession planning,
          valuations and general enquiries. planning, valuations and general
          enquiries.
        </Typography>
      </section>
      <section className="section-gap two-column">
        <Paper className="text-panel">
          <Typography variant="h5" sx={{ mb: 2 }}>
            Visit our office
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Namanve Industrial Park - Kiwanga, Off Jomayi stones.
          </Typography>
          <Typography sx={{ mb: 1 }}>P.O Box 129, Mukono, Uganda.</Typography>
          <Typography>Near Sadoline paints.</Typography>
        </Paper>
        <Paper className="text-panel">
          <Typography variant="h5" sx={{ mb: 2 }}>
            Contact details
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Email:</strong> solventug@gmail.com
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Call:</strong> (256)7 63 615 316
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Call:</strong> (256)7 52 440 513
          </Typography>
          <Typography>
            <strong>Coordinates:</strong> 0.3699001845277436, 32.69895912681014
          </Typography>
        </Paper>
      </section>
    </Container>
  );
}

function BlogPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <section className="page-hero">
        <Chip label="Editorial" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h2" sx={{ mb: 2 }}>
          Blog
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900 }}>
          Admin-authored stories, land market insights and buyer education will
          live here.
        </Typography>
      </section>
      <section className="section-gap bonus-info-grid">
        {[
          {
            title: "Verified land, faster decisions",
            body: "How transparency, title checks and site guidance reduce friction for buyers.",
          },
          {
            title: "What makes a listing market-ready?",
            body: "A simple checklist for photos, ownership proof and pricing readiness.",
          },
          {
            title: "How SAM.UG supports serious buyers",
            body: "From wishes to site visits and offers, the platform is designed to move interest into informed action.",
          },
        ].map((article) => (
          <Paper key={article.title} className="text-panel">
            <Typography variant="h5" sx={{ mb: 1 }}>
              {article.title}
            </Typography>
            <Typography color="text.secondary">{article.body}</Typography>
          </Paper>
        ))}
      </section>
    </Container>
  );
}

function BonusInfoPage({ bonusSections }: { bonusSections: BonusSection[] }) {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <section className="page-hero">
        <Chip label="Bonus Info" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h2" sx={{ mb: 2 }}>
          Bonus Info
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900 }}>
          Guidance content loaded from the backend documentation source.
        </Typography>
      </section>
      <section className="section-gap bonus-info-grid">
        {bonusSections.map((section) => (
          <Paper key={section.heading} className="text-panel">
            <Typography variant="h6" sx={{ mb: 1 }}>
              {section.heading}
            </Typography>
            <Typography color="text.secondary">{section.body}</Typography>
          </Paper>
        ))}
      </section>
    </Container>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const viewedListingIdsRef = useRef<Set<number>>(new Set());
  const listingsLoadMoreRef = useRef<HTMLDivElement | null>(null);
  const agentsLoadMoreRef = useRef<HTMLDivElement | null>(null);
  const [aboutAnchor, setAboutAnchor] = useState<HTMLElement | null>(null);
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);
  const [mobileNavAnchor, setMobileNavAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [agentActionAnchor, setAgentActionAnchor] =
    useState<HTMLElement | null>(null);
  const [listingActionAnchor, setListingActionAnchor] =
    useState<HTMLElement | null>(null);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(fallbackHero);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [latestListings, setLatestListings] = useState<Listing[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [bonusSections, setBonusSections] =
    useState<BonusSection[]>(fallbackBonus);
  const [user, setUser] = useState<User | null>(null);
  const [usersDirectory, setUsersDirectory] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [agents, setAgents] = useState<User[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(() => {
    return window.localStorage.getItem(DASHBOARD_MENU_STORAGE_KEY) ?? "Listings";
  });
  const [listingsTab, setListingsTab] = useState<"all" | "for-you">("all");
  const [listingSearch, setListingSearch] = useState("");
  const [visibleListingsCount, setVisibleListingsCount] =
    useState(LISTINGS_BATCH_SIZE);
  const [agentSearch, setAgentSearch] = useState("");
  const [visibleAgentsCount, setVisibleAgentsCount] =
    useState(AGENTS_BATCH_SIZE);
  const [slideIndex, setSlideIndex] = useState(0);
  const [homeListingsTab, setHomeListingsTab] = useState<"featured" | "all">(
    "featured",
  );
  const [filters, setFilters] = useState({
    district: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loginForm, setLoginForm] = useState({
    identifier: "hmosem@gmail.com",
    password: "12345678",
  });
  const [signupForm, setSignupForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "12345678",
  });
  const [profileForm, setProfileForm] = useState({
    address: "",
    nationality: "",
  });
  const [wishDrawerOpen, setWishDrawerOpen] = useState(false);
  const [siteVisitDrawerOpen, setSiteVisitDrawerOpen] = useState(false);
  const [offerDrawerOpen, setOfferDrawerOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<User | null>(null);
  const [wishForm, setWishForm] = useState({
    title: "",
    description: "",
    price_range: "",
    purpose: "",
    district: "",
    village: "",
    size_range: "",
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
  });
  const [siteVisitForm, setSiteVisitForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
    scheduled_date: null as Dayjs | null,
    scheduled_time: null as Dayjs | null,
    message: "",
  });
  const [offerForm, setOfferForm] = useState({
    amount: "",
    full_name: "",
    mobile_number: "",
    email: "",
  });
  const [formAlert, setFormAlert] = useState<FormAlertState>({
    open: false,
    severity: "success",
    message: "",
  });
  const [authReady, setAuthReady] = useState(false);
  const isDashboardRoute = location.pathname === "/dashboard";

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setAuthReady(true);
    }
  }, []);

  useEffect(() => {
    void loadPublicContent();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    if (!user) {
      setStats(null);
      return;
    }

    void loadDashboard(user);
  }, [user]);

  useEffect(() => {
    if (!authReady) return;

    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [authReady, user]);

  useEffect(() => {
    window.localStorage.setItem(DASHBOARD_MENU_STORAGE_KEY, selectedMenu);
  }, [selectedMenu]);

  useEffect(() => {
    setVisibleListingsCount(LISTINGS_BATCH_SIZE);
  }, [listingSearch, listingsTab, selectedMenu]);

  useEffect(() => {
    setVisibleAgentsCount(AGENTS_BATCH_SIZE);
  }, [agentSearch, selectedMenu]);

  useEffect(() => {
    const menuItems =
      user?.role === "super_admin"
        ? superAdminMenu
        : user?.role === "admin"
          ? adminMenu
          : ["My Listings", "Analytics", "Profile"];

    if (!menuItems.includes(selectedMenu)) {
      setSelectedMenu(menuItems[0]);
    }
  }, [selectedMenu, user]);

  function showPreviousSlide() {
    setSlideIndex(
      (current) => (current - 1 + heroSlides.length) % heroSlides.length,
    );
  }

  function showNextSlide() {
    setSlideIndex((current) => (current + 1) % heroSlides.length);
  }

  function showFormAlert(severity: AlertSeverity, message: string) {
    setFormAlert({
      open: true,
      severity,
      message,
    });
  }

  function closeFormAlert() {
    setFormAlert((current) => ({ ...current, open: false }));
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate("/");
  }

  function getUserDisplayName(account: User | null | undefined) {
    if (!account) return "";

    return (
      account.full_name ||
      `${account.first_name || ""} ${account.last_name || ""}`.trim() ||
      account.email
    );
  }

  const listingAuthorsByOwnerId = new Map<number, User>();
  if (user) {
    listingAuthorsByOwnerId.set(user.id, user);
  }
  for (const account of usersDirectory) {
    listingAuthorsByOwnerId.set(account.id, account);
  }

  function getListingAuthorName(listing: Listing) {
    return getUserDisplayName(listingAuthorsByOwnerId.get(listing.owner_id));
  }

  function getListingAuthor(listing: Listing) {
    return listingAuthorsByOwnerId.get(listing.owner_id);
  }

  function getListingOfferCount(listingId: number) {
    return offers.filter((offer) => offer.listing_id === listingId).length;
  }

  function getListingSiteVisitCount(listingId: number) {
    return siteVisits.filter((visit) => visit.listing_id === listingId).length;
  }

  function getApiErrorMessage(error: unknown, fallback: string) {
    if (
      isAxiosError<{ detail?: string }>(error) &&
      typeof error.response?.data?.detail === "string"
    ) {
      return error.response.data.detail;
    }

    return fallback;
  }

  async function loadPublicContent(currentFilters?: typeof filters) {
    const activeFilters = currentFilters ?? filters;
    const isInitialLoad =
      featuredListings.length === 0 && latestListings.length === 0;

    if (isInitialLoad) {
      setPageLoading(true);
    }
    setListingsLoading(true);

    try {
      const [heroResponse, featuredResponse, latestResponse, bonusResponse] =
        await Promise.all([
          api.get<HeroSlide[]>("/hero-slides"),
          api.get<Listing[]>("/listings", { params: { featured: true } }),
          api.get<Listing[]>("/listings", {
            params: {
              latest: true,
              district: activeFilters.district || undefined,
              min_price: activeFilters.minPrice || undefined,
              max_price: activeFilters.maxPrice || undefined,
            },
          }),
          api.get<BonusSection[]>("/content/bonus-info"),
        ]);

      setHeroSlides(
        heroResponse.data.length ? heroResponse.data : fallbackHero,
      );
      setFeaturedListings(featuredResponse.data);
      setLatestListings(latestResponse.data);
      setBonusSections(
        bonusResponse.data.length ? bonusResponse.data : fallbackBonus,
      );
    } catch {
      setHeroSlides(fallbackHero);
      setBonusSections(fallbackBonus);
    } finally {
      if (isInitialLoad) {
        setPageLoading(false);
      }
      setListingsLoading(false);
    }
  }

  async function loadDashboard(activeUser: User) {
    setDashboardLoading(true);
    setListingsLoading(true);

    try {
      const dashboardRequests = [
        api.get<DashboardStats>(
          `/dashboard/${activeUser.role}/${activeUser.id}`,
        ),
        api.get<Listing[]>("/listings", {
          params: {
            latest: true,
            owner_id: activeUser.role === "agent" ? activeUser.id : undefined,
            role: activeUser.role,
          },
        }),
        api.get<Offer[]>("/offers"),
        api.get<SiteVisit[]>("/site-visits"),
      ] as const;

      if (activeUser.role === "admin" || activeUser.role === "super_admin") {
        const [
          statsResponse,
          listingsResponse,
          offersResponse,
          siteVisitsResponse,
          usersResponse,
          wishesResponse,
          auditLogsResponse,
        ] = await Promise.all([
          ...dashboardRequests,
          api.get<User[]>("/users"),
          api.get<Wish[]>("/wishes"),
          api.get<AuditLog[]>("/audit-logs"),
        ]);

        setStats(statsResponse.data);
        setLatestListings(listingsResponse.data);
        setOffers(offersResponse.data);
        setSiteVisits(siteVisitsResponse.data);
        setUsersDirectory(usersResponse.data);
        setAgents(
          usersResponse.data.filter((account) => account.role === "agent"),
        );
        setWishes(wishesResponse.data);
        setAuditLogs(auditLogsResponse.data);
      } else {
        const [
          statsResponse,
          listingsResponse,
          offersResponse,
          siteVisitsResponse,
        ] =
          await Promise.all(dashboardRequests);

        setStats(statsResponse.data);
        setLatestListings(listingsResponse.data);
        setOffers(offersResponse.data);
        setSiteVisits(siteVisitsResponse.data);
        setUsersDirectory([activeUser]);
        setAgents([]);
      }
    } finally {
      setDashboardLoading(false);
      setListingsLoading(false);
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post<{ user: User }>("/auth/login", loginForm);
      setUser(response.data.user);
      setSelectedMenu(
        response.data.user.role === "agent" ? "My Listings" : "Listings",
      );
      setDrawerMode(response.data.user.address ? "profile" : null);
      navigate("/dashboard");
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Username or password is incorrect.",
      );
      showFormAlert(
        "error",
        message === "Invalid credentials"
          ? "Username or password is incorrect."
          : message,
      );
    }
  }

  const normalizedListingSearch = listingSearch.trim().toLowerCase();
  const filteredDashboardListings = (
    listingsTab === "for-you"
      ? latestListings.filter((listing) => listing.owner_id === user?.id)
      : latestListings
  ).filter((listing) => {
    if (!normalizedListingSearch) return true;

    const searchableText = [
      listing.title,
      getListingAuthorName(listing),
      listing.size_text,
      listing.district,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedListingSearch);
  });

  const visibleDashboardListings = filteredDashboardListings.slice(
    0,
    visibleListingsCount,
  );

  const normalizedAgentSearch = agentSearch.trim().toLowerCase();
  const filteredAgents = agents.filter((agent) => {
    if (!normalizedAgentSearch) return true;

    const searchableText = [
      agent.full_name,
      agent.first_name,
      agent.last_name,
      agent.email,
      agent.address,
      agent.phone_number,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedAgentSearch);
  });

  const visibleAgents = filteredAgents.slice(0, visibleAgentsCount);

  useEffect(() => {
    if (selectedMenu !== "Listings") return;

    const target = listingsLoadMoreRef.current;
    if (!target || filteredDashboardListings.length <= visibleListingsCount) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        setVisibleListingsCount((current) =>
          Math.min(current + LISTINGS_BATCH_SIZE, filteredDashboardListings.length),
        );
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredDashboardListings.length, selectedMenu, visibleListingsCount]);

  useEffect(() => {
    if (selectedMenu !== "Agents") return;

    const target = agentsLoadMoreRef.current;
    if (!target || filteredAgents.length <= visibleAgentsCount) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        setVisibleAgentsCount((current) =>
          Math.min(current + AGENTS_BATCH_SIZE, filteredAgents.length),
        );
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredAgents.length, selectedMenu, visibleAgentsCount]);

  async function handleSignup(event: FormEvent) {
    event.preventDefault();
    try {
      await api.post("/auth/agents/signup", signupForm);
      setDrawerMode("login");
      setLoginForm({
        identifier: signupForm.email,
        password: signupForm.password,
      });
      showFormAlert(
        "success",
        "Agent signup saved successfully. Your application is pending approval.",
      );
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to submit your signup right now."),
      );
    }
  }

  async function handleProfileSave(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    try {
      const response = await api.patch<User>(`/users/${user.id}`, {
        address: profileForm.address,
        nationality: profileForm.nationality,
      });
      setUser(response.data);
      setDrawerMode(null);
      showFormAlert("success", "Profile saved successfully in the database.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to save your profile right now."),
      );
    }
  }

  function handleFilterSubmit(event: FormEvent) {
    event.preventDefault();
    void loadPublicContent(filters);
  }

  function getViewerKey() {
    if (user?.id) {
      return `user:${user.id}`;
    }

    const storageKey = "sam_viewer_key";
    const existingKey = window.localStorage.getItem(storageKey);
    if (existingKey) {
      return existingKey;
    }

    const generatedKey = `guest:${crypto.randomUUID()}`;
    window.localStorage.setItem(storageKey, generatedKey);
    return generatedKey;
  }

  function updateListingViews(listingId: number, totalViews: number) {
    setFeaturedListings((current) =>
      current.map((listing) =>
        listing.id === listingId
          ? { ...listing, total_views: totalViews }
          : listing,
      ),
    );
    setLatestListings((current) =>
      current.map((listing) =>
        listing.id === listingId
          ? { ...listing, total_views: totalViews }
          : listing,
      ),
    );
  }

  async function registerListingView(listingId: number) {
    if (viewedListingIdsRef.current.has(listingId)) {
      return;
    }

    viewedListingIdsRef.current.add(listingId);

    try {
      const response = await api.post<ListingViewResponse>(
        `/listings/${listingId}/view`,
        {
          viewer_key: getViewerKey(),
        },
      );
      updateListingViews(response.data.listing_id, response.data.total_views);
    } catch {
      viewedListingIdsRef.current.delete(listingId);
    }
  }

  function handleAccountMenuClose() {
    setAccountAnchor(null);
  }

  function handleMobileNavClose() {
    setMobileNavAnchor(null);
  }

  function handleAgentActionOpen(
    event: MouseEvent<HTMLElement>,
    agent: User,
  ) {
    event.stopPropagation();
    setAgentActionAnchor(event.currentTarget);
    setSelectedAgent(agent);
  }

  function handleAgentActionClose() {
    setAgentActionAnchor(null);
    setSelectedAgent(null);
  }

  function handleListingActionOpen(
    event: MouseEvent<HTMLElement>,
    _listing: Listing,
  ) {
    event.stopPropagation();
    setListingActionAnchor(event.currentTarget);
  }

  function handleListingActionClose() {
    setListingActionAnchor(null);
  }

  async function refreshAgents() {
    const response = await api.get<User[]>("/users", {
      params: { role: "agent" },
    });
    setAgents(response.data);
  }

  async function handleAgentAction(
    action: "approve" | "reject" | "deactivate" | "delete",
  ) {
    if (!selectedAgent) return;

    const agent = selectedAgent;
    handleAgentActionClose();

    try {
      if (action === "approve") {
        await api.patch(`/users/${agent.id}/approve`);
        showFormAlert("success", `${agent.full_name || agent.email} approved.`);
      } else if (action === "reject") {
        await api.patch(`/users/${agent.id}/reject`);
        showFormAlert("success", `${agent.full_name || agent.email} rejected.`);
      } else if (action === "deactivate") {
        await api.patch(`/users/${agent.id}/deactivate`);
        showFormAlert(
          "success",
          `${agent.full_name || agent.email} deactivated.`,
        );
      } else {
        await api.delete(`/users/${agent.id}`);
        showFormAlert("success", `${agent.full_name || agent.email} deleted.`);
      }

      await refreshAgents();
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, `Unable to ${action} this profile right now.`),
      );
    }
  }

  const appbarNavButtonSx = {
    color: "rgba(17,17,17,0.82)",
    transition: "color 180ms ease, background-color 180ms ease",
    borderRadius: 0,
    paddingBottom: "8px",
    "& .MuiButton-startIcon": {
      color: "inherit",
    },
    "&:hover": {
      color: "#ef5b2b",
      bgcolor: "rgba(239,91,43,0.08)",
    },
    "&:hover .MuiButton-startIcon": {
      color: "#ef5b2b",
    },
  };

  function getAppbarNavButtonSx(path: string) {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);

    return {
      ...appbarNavButtonSx,
      borderBottom: isActive ? "2px solid #ef5b2b" : "2px solid transparent",
    };
  }

  function openWishDrawer() {
    setWishDrawerOpen(true);
  }

  function closeWishDrawer() {
    setWishDrawerOpen(false);
  }

  function openSiteVisitDrawer(listing: Listing) {
    setSelectedListing(listing);
    setSiteVisitDrawerOpen(true);
  }

  function closeSiteVisitDrawer() {
    setSiteVisitDrawerOpen(false);
    setSelectedListing(null);
  }

  function openOfferDrawer(listing: Listing) {
    setSelectedListing(listing);
    setOfferDrawerOpen(true);
  }

  function closeOfferDrawer() {
    setOfferDrawerOpen(false);
    setSelectedListing(null);
  }

  function getDashboardMenuItems(activeUser: User) {
    return activeUser.role === "super_admin"
      ? superAdminMenu
      : activeUser.role === "admin"
        ? adminMenu
        : ["My Listings", "Analytics", "Profile"];
  }

  function renderDashboardPanel() {
    if (!user) return null;

    const infoPanel = (title: string, body: string) => (
      <Paper className="priority-card">
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography color="text.secondary">{body}</Typography>
      </Paper>
    );

    if (user.role === "agent") {
      if (selectedMenu === "Analytics") {
        return infoPanel(
          "Performance overview",
          "Track your active listings, views, sales and engagement in one place as your pipeline grows.",
        );
      }

      if (selectedMenu === "Profile") {
        return (
          <Paper className="priority-card">
            <Typography variant="h5" sx={{ mb: 2 }}>
              Agent profile
            </Typography>
            <div className="bullet-list">
              <Chip label={`Name: ${user.email.split("@")[0] || "Agent"}`} />
              <Chip label={`Email: ${user.email}`} />
              <Chip label={`Phone: ${user.phone_number || "Not added"}`} />
              <Chip label={`Address: ${user.address || "Not added"}`} />
            </div>
          </Paper>
        );
      }

      return listingsLoading ? (
        <ListingCardLoader count={3} className="listing-grid" />
      ) : (
        <div className="listing-grid">
          {latestListings.map((listing) => (
            <DashboardListingCard
              key={listing.id}
              listing={listing}
              authorName={getListingAuthorName(listing)}
              authorApproved={["approved", "active"].includes(
                getListingAuthor(listing)?.status ?? "",
              )}
              offerCount={getListingOfferCount(listing.id)}
              siteVisitCount={getListingSiteVisitCount(listing.id)}
              onRegisterView={registerListingView}
              onOpenActions={handleListingActionOpen}
            />
          ))}
        </div>
      );
    }

    if (selectedMenu === "Listings") {
      return listingsLoading ? (
        <ListingCardLoader count={3} className="listing-grid" />
      ) : (
        <Paper className="priority-card dashboard-listings-panel">
          <Tabs
            value={listingsTab}
            onChange={(_, value: "all" | "for-you") => setListingsTab(value)}
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 3 }}
          >
            <Tab value="all" label="All" />
            <Tab value="for-you" label="For You" />
          </Tabs>
          {visibleDashboardListings.length ? (
            <div className="listing-grid">
              {visibleDashboardListings.map((listing) => (
                <DashboardListingCard
                  key={listing.id}
                  listing={listing}
                  authorName={getListingAuthorName(listing)}
                  authorApproved={["approved", "active"].includes(
                    getListingAuthor(listing)?.status ?? "",
                  )}
                  offerCount={getListingOfferCount(listing.id)}
                  siteVisitCount={getListingSiteVisitCount(listing.id)}
                  onRegisterView={registerListingView}
                  onOpenActions={handleListingActionOpen}
                />
              ))}
            </div>
          ) : (
            <Box className="dashboard-empty-state">
              <Typography variant="h6">No listings here yet.</Typography>
              <Typography color="text.secondary">
                {normalizedListingSearch
                  ? "No listings match your search yet."
                  : listingsTab === "for-you"
                  ? "There are no listings assigned to your profile right now."
                  : "No listings are available at the moment."}
              </Typography>
            </Box>
          )}
          {filteredDashboardListings.length > visibleDashboardListings.length ? (
            <Box ref={listingsLoadMoreRef} className="dashboard-load-more-trigger">
              <CircularProgress size={24} color="warning" />
            </Box>
          ) : null}
        </Paper>
      );
    }

    if (selectedMenu === "Agents") {
      return (
        <>
          {visibleAgents.length ? (
            <div className="agent-grid">
              {visibleAgents.map((agent) => (
                <Card key={agent.id} className="agent-card" elevation={2}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={resolveAgentImage(agent.profile_picture, agent.id)}
                    alt={
                      agent.full_name ||
                      `${agent.first_name || ""} ${agent.last_name || ""}`.trim() ||
                      agent.email
                    }
                  />
                  <CardContent sx={{ display: "grid", gap: 1.25 }}>
                    {(() => {
                      const agentListings = latestListings.filter(
                        (listing) => listing.owner_id === agent.id,
                      );
                      const agentViews = agentListings.reduce(
                        (sum, listing) => sum + listing.total_views,
                        0,
                      );

                      return (
                        <>
                          <div className="agent-card-title-row">
                            <div className="agent-card-title-copy">
                              <Typography variant="h6">
                                {agent.full_name ||
                                  `${agent.first_name || ""} ${agent.last_name || ""}`.trim() ||
                                  agent.email}
                              </Typography>
                              {agent.status === "approved" ||
                              agent.status === "active" ? (
                                <VerifiedIcon
                                  className="agent-verified-icon"
                                  fontSize="small"
                                />
                              ) : null}
                            </div>
                            <IconButton
                              size="small"
                              aria-label={`Open actions for ${agent.full_name || agent.email}`}
                              onClick={(event) =>
                                handleAgentActionOpen(event, agent)
                              }
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </div>
                          <Divider />
                          <Typography variant="body2" color="text.secondary">
                            Residence:{" "}
                            {[agent.village, agent.district]
                              .filter(Boolean)
                              .join(", ") || "Not added"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {agent.email}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {agent.phone_number || "No phone number"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Experience: {agent.experience || "Not added"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Sales closed: {agent.sales_closed ?? 0}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatMemberDuration(agent.created_at)}
                          </Typography>
                          <div className="agent-stats-row">
                            <Chip
                              size="small"
                              label={`${agentListings.length} listings`}
                            />
                            <Chip
                              size="small"
                              icon={<VisibilityOutlinedIcon fontSize="small" />}
                              label={`${agentViews} views`}
                            />
                          </div>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Box className="dashboard-empty-state">
              <Typography variant="h6">No agents here yet.</Typography>
              <Typography color="text.secondary">
                No agents match your current search.
              </Typography>
            </Box>
          )}
          {filteredAgents.length > visibleAgents.length ? (
            <Box ref={agentsLoadMoreRef} className="dashboard-load-more-trigger">
              <CircularProgress size={24} color="warning" />
            </Box>
          ) : null}
        </>
      );
    }

    if (selectedMenu === "Wishes") {
      return (
        <div className="listing-grid">
          {wishes.map((wish) => (
            <Paper key={wish.id} className="text-panel">
              <Typography variant="h6" sx={{ mb: 1 }}>
                {wish.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {wish.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {wish.customer_name} | {wish.customer_email}
              </Typography>
            </Paper>
          ))}
        </div>
      );
    }

    if (selectedMenu === "Site Visits") {
      return (
        <div className="listing-grid">
          {siteVisits.map((visit) => (
            <Paper key={visit.id} className="text-panel">
              <Typography variant="h6" sx={{ mb: 1 }}>
                Visit for Listing #{visit.listing_id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {visit.customer_name} | {visit.customer_email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {visit.scheduled_date} at {visit.scheduled_time}
              </Typography>
            </Paper>
          ))}
        </div>
      );
    }

    if (selectedMenu === "Offers") {
      return (
        <div className="listing-grid">
          {offers.map((offer) => (
            <Paper key={offer.id} className="text-panel">
              <Typography variant="h6" sx={{ mb: 1 }}>
                {formatPrice(offer.amount)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {offer.full_name} | {offer.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {offer.status}
              </Typography>
            </Paper>
          ))}
        </div>
      );
    }

    if (selectedMenu === "Reports") {
      return (
        <Paper className="priority-card">
          <Typography variant="h5" sx={{ mb: 2 }}>
            Priority actions
          </Typography>
          <div className="bullet-list">
            <Chip
              icon={<CheckCircleOutlineOutlinedIcon />}
              label="Approve agents"
            />
            <Chip
              icon={<CheckCircleOutlineOutlinedIcon />}
              label="Review wishes and site visits"
            />
            <Chip
              icon={<CheckCircleOutlineOutlinedIcon />}
              label="Monitor offers and reports"
            />
          </div>
        </Paper>
      );
    }

    if (selectedMenu === "Audit logs") {
      return (
        <div className="listing-grid">
          {auditLogs.map((log) => (
            <Paper key={log.id} className="text-panel">
              <Typography variant="h6" sx={{ mb: 1 }}>
                {log.action}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {log.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(log.created_at).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </div>
      );
    }

    if (selectedMenu === "Settings") {
      return infoPanel(
        "System settings",
        "Manage account setup, approvals, and operational preferences from this shared admin workspace.",
      );
    }

    return null;
  }

  async function handleWishSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await api.post("/wishes", wishForm);
      setWishForm({
        title: "",
        description: "",
        price_range: "",
        purpose: "",
        district: "",
        village: "",
        size_range: "",
        customer_name: "",
        customer_email: "",
        customer_mobile_number: "",
      });
      closeWishDrawer();
      showFormAlert("success", "Wish saved successfully in the database.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to save your wish right now."),
      );
    }
  }

  async function handleSiteVisitSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedListing) return;
    try {
      await api.post("/site-visits", {
        listing_id: selectedListing.id,
        customer_name: siteVisitForm.customer_name,
        customer_email: siteVisitForm.customer_email,
        customer_mobile_number: siteVisitForm.customer_mobile_number,
        scheduled_date: siteVisitForm.scheduled_date?.format("YYYY-MM-DD"),
        scheduled_time: siteVisitForm.scheduled_time?.format("HH:mm"),
        message: siteVisitForm.message,
      });
      setSiteVisitForm({
        customer_name: "",
        customer_email: "",
        customer_mobile_number: "",
        scheduled_date: null,
        scheduled_time: null,
        message: "",
      });
      closeSiteVisitDrawer();
      showFormAlert(
        "success",
        "Site visit request saved successfully in the database.",
      );
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(
          error,
          "Unable to save your site visit request right now.",
        ),
      );
    }
  }

  async function handleOfferSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedListing) return;
    try {
      await api.post("/offers", {
        listing_id: selectedListing.id,
        amount: Number(offerForm.amount),
        full_name: offerForm.full_name,
        mobile_number: offerForm.mobile_number,
        email: offerForm.email,
        user_id: user?.id ?? null,
      });
      setOfferForm({
        amount: "",
        full_name: "",
        mobile_number: "",
        email: "",
      });
      closeOfferDrawer();
      showFormAlert("success", "Offer saved successfully in the database.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to save your offer right now."),
      );
    }
  }

  const renderTopBar = () => (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        bgcolor: "#0f172a",
        color: "rgba(255,255,255,0.9)",
        py: 1.2,
      }}
    >
      <Container maxWidth="xl">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-item">
              <PhoneOutlinedIcon fontSize="small" sx={{ color: "#ef5b2b" }} />
              <span>(+256) 763615316</span>
            </div>
            <div className="topbar-item">
              <PhoneOutlinedIcon fontSize="small" sx={{ color: "#ef5b2b" }} />
              <span>(+256) 752440513</span>
            </div>
            <div className="topbar-item">
              <PlaceOutlinedIcon fontSize="small" sx={{ color: "#ef5b2b" }} />
              <span>Namanve Industrial park-kiwanga, Off Jomayi stones</span>
            </div>
          </div>
          <div className="topbar-item">
            <AccessTimeOutlinedIcon
              fontSize="small"
              sx={{ color: "#ef5b2b" }}
            />
            <span>9:00 - 18:00 (Mon - Fri)</span>
          </div>
        </div>
      </Container>
    </Box>
  );

  const renderAppShellBar = (showDashboardToggle = false) => (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        bgcolor: "rgba(255,252,247,0.96)",
        borderBottom: "1px solid rgba(17,17,17,0.08)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "56px !important",
            py: 0,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showDashboardToggle && user ? (
            <div className="brand-row">
              <IconButton
                onClick={() => setSidebarOpen((open) => !open)}
                sx={{ color: "#111111" }}
              >
                <MenuIcon />
              </IconButton>
              <img
                className="appbar-title-image"
                src={logo}
                alt="Solvent Asset Management"
              />
            </div>
          ) : (
            <div className="brand-row">
              <img
                className="appbar-title-image"
                src={logo}
                alt="Solvent Asset Management"
              />
            </div>
          )}
          <div className="nav-row nav-row-desktop">
            <>
              <Button
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                sx={getAppbarNavButtonSx("/")}
              >
                Home
              </Button>
              <Button
                onClick={(event) => setAboutAnchor(event.currentTarget)}
                sx={getAppbarNavButtonSx("/about")}
              >
                About
              </Button>
              <Button
                component={Link}
                to="/contact"
                sx={getAppbarNavButtonSx("/contact")}
              >
                Contact Us
              </Button>
              <Button
                component={Link}
                to="/blog"
                sx={getAppbarNavButtonSx("/blog")}
              >
                Blog
              </Button>
              <Button
                component={Link}
                to="/bonus-info"
                sx={getAppbarNavButtonSx("/bonus-info")}
              >
                Bonus Info
              </Button>
            </>
            <IconButton
              onClick={(event) => setAccountAnchor(event.currentTarget)}
              sx={{
                bgcolor: "#ffffff",
                color: "#ef5b2b",
                width: 44,
                height: 44,
                border: "2px solid #ef5b2b",
                "&:hover": {
                  bgcolor: "#fff1eb",
                },
              }}
            >
              <PersonIcon sx={{ color: "#ef5b2b" }} />
            </IconButton>
          </div>
          <div className="appbar-actions">
            <IconButton
              onClick={(event) => setAccountAnchor(event.currentTarget)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                bgcolor: "#ffffff",
                color: "#ef5b2b",
                width: 44,
                height: 44,
                border: "2px solid #ef5b2b",
                "&:hover": {
                  bgcolor: "#fff1eb",
                },
              }}
            >
              <PersonIcon sx={{ color: "#ef5b2b" }} />
            </IconButton>
            <IconButton
              onClick={(event) => setMobileNavAnchor(event.currentTarget)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "#111111",
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );

  const renderAboutMenu = () => (
    <Menu
      anchorEl={aboutAnchor}
      open={Boolean(aboutAnchor)}
      onClose={() => setAboutAnchor(null)}
    >
      <MenuItem
        component={Link}
        to="/about"
        onClick={() => setAboutAnchor(null)}
      >
        Our Values
      </MenuItem>
      <MenuItem
        component={Link}
        to="/about"
        onClick={() => setAboutAnchor(null)}
      >
        Mission & Vision
      </MenuItem>
      <MenuItem
        component={Link}
        to="/about"
        onClick={() => setAboutAnchor(null)}
      >
        Our Objectives
      </MenuItem>
    </Menu>
  );

  const renderAccountMenu = () => (
    <Menu
      anchorEl={accountAnchor}
      open={Boolean(accountAnchor)}
      onClose={handleAccountMenuClose}
    >
      {user
        ? isDashboardRoute
          ? [
              <MenuItem
                key="profile"
                onClick={() => {
                  setSelectedMenu("Profile");
                  handleAccountMenuClose();
                }}
              >
                <PersonOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                Profile
              </MenuItem>,
              <MenuItem
                key="logout"
                onClick={() => {
                  logout();
                  handleAccountMenuClose();
                }}
              >
                <LogoutOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="dashboard"
                onClick={() => {
                  setSelectedMenu(
                    user.role === "agent" ? "My Listings" : "Listings",
                  );
                  navigate("/dashboard");
                  handleAccountMenuClose();
                }}
              >
                <DashboardOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                Dashboard
              </MenuItem>,
              <MenuItem
                key="logout"
                onClick={() => {
                  logout();
                  handleAccountMenuClose();
                }}
              >
                <LogoutOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                Logout
              </MenuItem>,
            ]
        : [
            <MenuItem
              key="login"
              onClick={() => {
                setDrawerMode("login");
                handleAccountMenuClose();
              }}
            >
              <PersonIcon fontSize="small" sx={{ mr: 1, color: "#ef5b2b" }} />
              Login
            </MenuItem>,
            <MenuItem
              key="signup"
              onClick={() => {
                setDrawerMode("signup");
                handleAccountMenuClose();
              }}
            >
              <PersonOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              Signup
            </MenuItem>,
          ]}
    </Menu>
  );

  const renderMobileNavMenu = () => (
    <Menu
      anchorEl={mobileNavAnchor}
      open={Boolean(mobileNavAnchor)}
      onClose={handleMobileNavClose}
    >
      <MenuItem component={Link} to="/" onClick={handleMobileNavClose}>
        <HomeIcon fontSize="small" sx={{ mr: 1 }} />
        Home
      </MenuItem>
      <MenuItem component={Link} to="/about" onClick={handleMobileNavClose}>
        About
      </MenuItem>
      <MenuItem component={Link} to="/contact" onClick={handleMobileNavClose}>
        Contact Us
      </MenuItem>
      <MenuItem component={Link} to="/blog" onClick={handleMobileNavClose}>
        Blog
      </MenuItem>
      <MenuItem
        component={Link}
        to="/bonus-info"
        onClick={handleMobileNavClose}
      >
        Bonus Info
      </MenuItem>
    </Menu>
  );

  const renderFooter = () => (
    <footer className="site-footer">
      <Container maxWidth="xl">
        <div className="footer-grid">
          <Paper className="footer-card">
            <div className="footer-card-dot" />
            <Typography
              variant="h5"
              className="footer-card-title"
              sx={{ opacity: "70%" }}
            >
              <span className="footer-card-title-accent">Solvent</span> Asset
              Management
            </Typography>
            <Typography component="br" />
            <Typography variant="body1" sx={{ opacity: "70%" }}>
              Solvent Asset Management Ltd connects buyers, sellers and trusted
              agents across Uganda. We provide verified listings, professional
              agent support and confidential off-market alerts;
            </Typography>
            <div className="footer-bullet-list">
              <Typography
                variant="body2"
                sx={{ color: "inherit", opacity: "70%" }}
              >
                <span className="footer-bullet">&#10003;</span> Verified
                listings - Transparent pricing and vetted agents
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "inherit", opacity: "70%" }}
              >
                <span className="footer-bullet">&#10003;</span> Private alerts -
                Early access to off-market opportunities
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "inherit", opacity: "70%" }}
              >
                <span className="footer-bullet">&#10003;</span> Land services -
                Surveying, title checks and stewardship
              </Typography>
            </div>
            <Button
              variant="contained"
              color="warning"
              size="small"
              sx={{ mt: 2, width: "fit-content" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to Top
            </Button>
          </Paper>
          <Paper className="footer-card">
            <div className="footer-card-dot" />
            <Typography
              variant="h5"
              className="footer-card-title"
              sx={{ opacity: "70%" }}
            >
              <span className="footer-card-title-accent">About</span> Land
              Management
            </Typography>
            <Typography component="br" />
            <Typography variant="body1" sx={{ mb: 1.5, opacity: "70%" }}>
              Our Land Management services cover surveying, title verification,
              development planning and long-term asset stewardship tailored to
              your needs.
            </Typography>
            <Typography variant="body1" sx={{ opacity: "70%" }}>
              Who We Are
            </Typography>
            <Typography variant="body1" sx={{ opacity: "70%" }}>
              Our Values
            </Typography>
            <Typography variant="body1" sx={{ opacity: "70%" }}>
              Our Approach
            </Typography>
            <Typography variant="body1" sx={{ opacity: "70%" }}>
              Market Reports
            </Typography>
            <Typography variant="body1" sx={{ opacity: "70%" }}>
              FAQ
            </Typography>
          </Paper>
          <Paper className="footer-card">
            <div className="footer-card-dot" />
            <Typography
              variant="h5"
              className="footer-card-title"
              sx={{ opacity: "70%" }}
            >
              <span className="footer-card-title-accent">Contact</span>{" "}
              information
            </Typography>
            <Typography component="br" />
            <Typography
              variant="body1"
              sx={{ opacity: "70%" }}
              className="footer-contact-item"
            >
              <EmailOutlinedIcon
                fontSize="small"
                sx={{ color: "warning.light" }}
              />
              solventug@gmail.com
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: "70%" }}
              className="footer-contact-item"
            >
              <PhoneOutlinedIcon
                fontSize="small"
                sx={{ color: "warning.light" }}
              />
              (+256) 763615316
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: "70%" }}
              className="footer-contact-item"
            >
              <PhoneOutlinedIcon
                fontSize="small"
                sx={{ color: "warning.light" }}
              />
              (+256) 752440513
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: "70%" }}
              className="footer-contact-item"
            >
              <PlaceOutlinedIcon
                fontSize="small"
                sx={{ color: "warning.light" }}
              />
              Namanve Industrial Park - Kiwanga, Off Jomayi stones
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: "70%" }}
              className="footer-contact-item"
            >
              <AccessTimeOutlinedIcon
                fontSize="small"
                sx={{ color: "warning.light" }}
              />
              9:00 - 18:00 (Mon - Fri)
            </Typography>
            <Typography variant="body1" sx={{ opacity: "70%" }}></Typography>
            <div className="footer-social-row">
              <Stack
                direction="row"
                spacing={1}
                aria-label="Social media links"
              >
                <IconButton
                  className="footer-social-button "
                  sx={{
                    color: "inherit",
                    border: "1px solid rgba(255,255,255,0.7)",

                    "&:hover": {
                      color: "white",
                      backgroundColor: "warning.main",
                    },
                  }}
                >
                  <FacebookOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  className="footer-social-button"
                  sx={{
                    color: "inherit",
                    border: "1px solid rgba(255,255,255,0.7)",

                    "&:hover": {
                      color: "white",
                      backgroundColor: "warning.main",
                    },
                  }}
                >
                  <XIcon fontSize="small" />
                </IconButton>
                <IconButton
                  className="footer-social-button"
                  sx={{
                    color: "inherit",
                    border: "1px solid rgba(255,255,255,0.7)",

                    "&:hover": {
                      color: "white",
                      backgroundColor: "warning.main",
                    },
                  }}
                >
                  <MusicNoteOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  className="footer-social-button"
                  sx={{
                    color: "inherit",
                    border: "1px solid rgba(255,255,255,0.7)",

                    "&:hover": {
                      color: "white",
                      backgroundColor: "warning.main",
                    },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
            </div>
          </Paper>
        </div>
        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />
        <div className="footer-bottom">
          <Typography variant="body1" sx={{ opacity: "70%" }}>
            Copyright 2026 Solvent Asset Management Ltd. All rights reserved.
          </Typography>
          <Typography variant="body1" sx={{ opacity: "70%" }}>
            Designed by Skylab
          </Typography>
        </div>
      </Container>
    </footer>
  );

  if (isDashboardRoute && !authReady) {
    return (
      <Box className="sam-shell">
        <PageLoader />
      </Box>
    );
  }

  if (user && isDashboardRoute) {
    const menuItems = getDashboardMenuItems(user);

    return (
      <Box className="sam-shell">
        {renderTopBar()}
        {renderAppShellBar(true)}
        {renderAboutMenu()}
        {renderAccountMenu()}
        {renderMobileNavMenu()}
        <Box
          className={`dashboard-page${sidebarOpen ? "" : " dashboard-page-collapsed"}`}
        >
          {user.role === "admin" || user.role === "super_admin" ? (
            <aside
              className={`mini-drawer${sidebarOpen ? "" : " mini-drawer-collapsed"}`}
            >
              {menuItems.map((item) => (
                <button
                  type="button"
                  className={`mini-item${selectedMenu === item ? " mini-item-selected" : ""}`}
                  key={item}
                  onClick={() => setSelectedMenu(item)}
                >
                  <span className="mini-item-icon">
                    {dashboardMenuIcons[item]}
                  </span>
                  {sidebarOpen ? (
                    <span className="mini-item-label">{item}</span>
                  ) : null}
                </button>
              ))}
            </aside>
          ) : null}
          <main className="dashboard-main">
            {dashboardLoading ? (
              <PageLoader />
            ) : (
              <>
                <div className="dashboard-top">
                  <div className="dashboard-top-inner">
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {selectedMenu}
                    </Typography>
                    {selectedMenu === "Listings" ? (
                      <TextField
                        size="small"
                        label="Search listings"
                        value={listingSearch}
                        onChange={(event) => setListingSearch(event.target.value)}
                        placeholder="Title, author, size, district"
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{ minWidth: { xs: "100%", sm: 320 } }}
                      />
                    ) : null}
                    {selectedMenu === "Agents" ? (
                      <TextField
                        size="small"
                        label="Search agents"
                        value={agentSearch}
                        onChange={(event) => setAgentSearch(event.target.value)}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{ minWidth: { xs: "100%", sm: 280 } }}
                      />
                    ) : null}
                  </div>
                  <div className="dashboard-top-divider">
                    <Divider />
                  </div>
                </div>

                {selectedMenu !== "Agents" && selectedMenu !== "Listings" ? (
                  <div className="stats-grid">
                    <Paper className="stat-card">
                      <Typography variant="h4" color="primary.main">
                        {stats?.total_listings ?? 0}
                      </Typography>
                      <Typography color="text.secondary">
                        Total Listings
                      </Typography>
                    </Paper>
                    <Paper className="stat-card">
                      <Typography variant="h4" color="primary.main">
                        {stats?.approved_listings ?? 0}
                      </Typography>
                      <Typography color="text.secondary">
                        Approved Listings
                      </Typography>
                    </Paper>
                    <Paper className="stat-card">
                      <Typography variant="h4" color="primary.main">
                        {stats?.total_views ?? 0}
                      </Typography>
                      <Typography color="text.secondary">
                        Total Views
                      </Typography>
                    </Paper>
                    <Paper className="stat-card">
                      <Typography variant="h4" color="primary.main">
                        {user.role === "agent"
                          ? (stats?.total_sales ?? 0)
                          : (stats?.total_offers ?? 0)}
                      </Typography>
                      <Typography color="text.secondary">
                        {user.role === "agent" ? "Total Sales" : "Offers"}
                      </Typography>
                    </Paper>
                  </div>
                ) : null}

                <div className="dashboard-content">
                  {renderDashboardPanel()}
                </div>
              </>
            )}
          </main>
        </Box>
        <Drawer
          anchor="right"
          open={siteVisitDrawerOpen}
          onClose={closeSiteVisitDrawer}
        >
          <Box sx={{ width: { xs: 360, sm: 440 }, p: 3 }}>
            <Box component="form" onSubmit={handleSiteVisitSubmit}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Site Visit
              </Typography>
              <Typography color="text.secondary">
                {selectedListing
                  ? `Book a visit for ${selectedListing.title}.`
                  : "Book a visit and our team will confirm the schedule with you."}
              </Typography>
              <Divider sx={{ my: 2.5 }} />
              <div className="drawer-form drawer-form-compact">
                <TextField
                  className="drawer-form-full"
                  label="Your name"
                  value={siteVisitForm.customer_name}
                  onChange={(event) =>
                    setSiteVisitForm({
                      ...siteVisitForm,
                      customer_name: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  className="drawer-form-full"
                  label="Email"
                  type="email"
                  value={siteVisitForm.customer_email}
                  onChange={(event) =>
                    setSiteVisitForm({
                      ...siteVisitForm,
                      customer_email: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  className="drawer-form-full"
                  label="Phone number"
                  value={siteVisitForm.customer_mobile_number}
                  onChange={(event) =>
                    setSiteVisitForm({
                      ...siteVisitForm,
                      customer_mobile_number: event.target.value,
                    })
                  }
                  required
                />
                <DatePicker
                  label="Preferred date"
                  value={siteVisitForm.scheduled_date}
                  onChange={(value) =>
                    setSiteVisitForm({
                      ...siteVisitForm,
                      scheduled_date: value,
                    })
                  }
                  slotProps={{ textField: { required: true } }}
                />
                <TimePicker
                  label="Preferred time"
                  value={siteVisitForm.scheduled_time}
                  onChange={(value) =>
                    setSiteVisitForm({
                      ...siteVisitForm,
                      scheduled_time: value,
                    })
                  }
                  slotProps={{ textField: { required: true } }}
                />
                <TextField
                  className="drawer-form-full"
                  label="Message"
                  multiline
                  minRows={3}
                  value={siteVisitForm.message}
                  onChange={(event) =>
                    setSiteVisitForm({
                      ...siteVisitForm,
                      message: event.target.value,
                    })
                  }
                />
                <Box className="drawer-actions">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={closeSiteVisitDrawer}
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="contained" size="large">
                    Book site visit
                  </Button>
                </Box>
              </div>
            </Box>
          </Box>
        </Drawer>
        <Drawer
          anchor="right"
          open={offerDrawerOpen}
          onClose={closeOfferDrawer}
        >
          <Box sx={{ width: { xs: 360, sm: 440 }, p: 3 }}>
            <Box component="form" onSubmit={handleOfferSubmit}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Give an Offer
              </Typography>
              <Typography color="text.secondary">
                {selectedListing
                  ? `Share your offer for ${selectedListing.title}.`
                  : "Send your offer and our team will follow up with you."}
              </Typography>
              <Divider sx={{ my: 2.5 }} />
              <div className="drawer-form drawer-form-single-column">
                <TextField
                  label="Offer amount (UGX)"
                  value={offerForm.amount}
                  onChange={(event) =>
                    setOfferForm({ ...offerForm, amount: event.target.value })
                  }
                  required
                />
                <TextField
                  label="Full name"
                  value={offerForm.full_name}
                  onChange={(event) =>
                    setOfferForm({
                      ...offerForm,
                      full_name: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  label="Phone number"
                  value={offerForm.mobile_number}
                  onChange={(event) =>
                    setOfferForm({
                      ...offerForm,
                      mobile_number: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  value={offerForm.email}
                  onChange={(event) =>
                    setOfferForm({ ...offerForm, email: event.target.value })
                  }
                  required
                />
                <Box className="drawer-actions">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={closeOfferDrawer}
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="contained" size="large">
                    Submit offer
                  </Button>
                </Box>
              </div>
            </Box>
          </Box>
        </Drawer>
        <Menu
          anchorEl={agentActionAnchor}
          open={Boolean(agentActionAnchor)}
          onClose={handleAgentActionClose}
          slotProps={{ paper: { sx: { width: 270 } } }}
        >
        <MenuItem onClick={() => void handleAgentAction("approve")}>
          <CheckCircleOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          Approve
        </MenuItem>
        <MenuItem onClick={() => void handleAgentAction("reject")}>
          <CancelIcon fontSize="small" sx={{ mr: 1 }} />
          Reject
        </MenuItem>
        <MenuItem onClick={() => void handleAgentAction("deactivate")}>
          <BlockIcon fontSize="small" sx={{ mr: 1 }} />
          Deactivate
        </MenuItem>
        <MenuItem onClick={() => void handleAgentAction("delete")}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        </Menu>
        <Menu
          anchorEl={listingActionAnchor}
          open={Boolean(listingActionAnchor)}
          onClose={handleListingActionClose}
          slotProps={{ paper: { sx: { width: 270 } } }}
        >
          <MenuItem onClick={handleListingActionClose}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleListingActionClose}>
            <CheckCircleOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            Approve
          </MenuItem>
          <MenuItem onClick={handleListingActionClose}>
            <StarIcon fontSize="small" sx={{ mr: 1 }} />
            Featured
          </MenuItem>
          <MenuItem onClick={handleListingActionClose}>
            <CancelIcon fontSize="small" sx={{ mr: 1 }} />
            Reject
          </MenuItem>
          <MenuItem onClick={handleListingActionClose}>
            <BlockIcon fontSize="small" sx={{ mr: 1 }} />
            Deactivate
          </MenuItem>
          <MenuItem onClick={handleListingActionClose}>
            <SellIcon fontSize="small" sx={{ mr: 1 }} />
            Sold Off
          </MenuItem>
          <MenuItem onClick={handleListingActionClose}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
        <Snackbar
          open={formAlert.open}
          autoHideDuration={5000}
          onClose={closeFormAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={closeFormAlert}
            severity={formAlert.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {formAlert.message}
          </Alert>
        </Snackbar>
        {renderFooter()}
      </Box>
    );
  }

  return (
    <Box className="sam-shell">
      {renderTopBar()}
      {renderAppShellBar()}
      {renderAboutMenu()}
      {renderAccountMenu()}
      {renderMobileNavMenu()}
      {pageLoading ? (
        <PageLoader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                featuredListings={featuredListings}
                latestListings={latestListings}
                heroSlides={heroSlides}
                listingsLoading={listingsLoading}
                homeListingsTab={homeListingsTab}
                filters={filters}
                slideIndex={slideIndex}
                setFilters={setFilters}
                setHomeListingsTab={setHomeListingsTab}
                setSlideIndex={setSlideIndex}
                handleFilterSubmit={handleFilterSubmit}
                showPreviousSlide={showPreviousSlide}
                showNextSlide={showNextSlide}
                onOpenWish={openWishDrawer}
                onOpenSiteVisit={openSiteVisitDrawer}
                onOpenOffer={openOfferDrawer}
                onRegisterView={registerListingView}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/bonus-info"
            element={<BonusInfoPage bonusSections={bonusSections} />}
          />
          <Route
            path="*"
            element={
              <HomePage
                featuredListings={featuredListings}
                latestListings={latestListings}
                heroSlides={heroSlides}
                listingsLoading={listingsLoading}
                homeListingsTab={homeListingsTab}
                filters={filters}
                slideIndex={slideIndex}
                setFilters={setFilters}
                setHomeListingsTab={setHomeListingsTab}
                setSlideIndex={setSlideIndex}
                handleFilterSubmit={handleFilterSubmit}
                showPreviousSlide={showPreviousSlide}
                showNextSlide={showNextSlide}
                onOpenWish={openWishDrawer}
                onOpenSiteVisit={openSiteVisitDrawer}
                onOpenOffer={openOfferDrawer}
                onRegisterView={registerListingView}
              />
            }
          />
        </Routes>
      )}

      {renderFooter()}

      <Drawer anchor="right" open={wishDrawerOpen} onClose={closeWishDrawer}>
        <Box sx={{ width: { xs: 360, sm: 440 }, p: 3 }}>
          <Box component="form" onSubmit={handleWishSubmit}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Your Wish
            </Typography>
            <Typography color="text.secondary">
              Tell us the kind of property you want and the team will follow up
              with curated options.
            </Typography>
            <Divider sx={{ my: 2.5 }} />
            <div className="drawer-form drawer-form-compact">
              <TextField
                className="drawer-form-full"
                label="Your name"
                value={wishForm.customer_name}
                onChange={(event) =>
                  setWishForm({
                    ...wishForm,
                    customer_name: event.target.value,
                  })
                }
                required
              />
              <TextField
                className="drawer-form-full"
                label="Wish title"
                value={wishForm.title}
                onChange={(event) =>
                  setWishForm({ ...wishForm, title: event.target.value })
                }
                required
              />
              <TextField
                className="drawer-form-full"
                label="Description"
                multiline
                minRows={3}
                value={wishForm.description}
                onChange={(event) =>
                  setWishForm({ ...wishForm, description: event.target.value })
                }
                required
              />
              <TextField
                className="drawer-form-full"
                label="Phone number"
                value={wishForm.customer_mobile_number}
                onChange={(event) =>
                  setWishForm({
                    ...wishForm,
                    customer_mobile_number: event.target.value,
                  })
                }
                required
              />
              <TextField
                className="drawer-form-full"
                label="Email"
                type="email"
                value={wishForm.customer_email}
                onChange={(event) =>
                  setWishForm({
                    ...wishForm,
                    customer_email: event.target.value,
                  })
                }
                required
              />
              <TextField
                label="Preferred district"
                value={wishForm.district}
                onChange={(event) =>
                  setWishForm({ ...wishForm, district: event.target.value })
                }
              />
              <TextField
                label="Village / area"
                value={wishForm.village}
                onChange={(event) =>
                  setWishForm({ ...wishForm, village: event.target.value })
                }
              />
              <TextField
                label="Size range"
                value={wishForm.size_range}
                onChange={(event) =>
                  setWishForm({ ...wishForm, size_range: event.target.value })
                }
              />
              <TextField
                label="Price range"
                value={wishForm.price_range}
                onChange={(event) =>
                  setWishForm({ ...wishForm, price_range: event.target.value })
                }
              />
              <TextField
                className="drawer-form-full"
                label="Purpose"
                value={wishForm.purpose}
                onChange={(event) =>
                  setWishForm({ ...wishForm, purpose: event.target.value })
                }
              />
              <Box className="drawer-actions">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={closeWishDrawer}
                >
                  Close
                </Button>
                <Button type="submit" variant="contained" size="large">
                  Submit wish
                </Button>
              </Box>
            </div>
          </Box>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={offerDrawerOpen} onClose={closeOfferDrawer}>
        <Box sx={{ width: { xs: 360, sm: 440 }, p: 3 }}>
          <Box component="form" onSubmit={handleOfferSubmit}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Give an Offer
            </Typography>
            <Typography color="text.secondary">
              {selectedListing
                ? `Share your offer for ${selectedListing.title}.`
                : "Send your offer and our team will follow up with you."}
            </Typography>
            <Divider sx={{ my: 2.5 }} />
            <div className="drawer-form drawer-form-single-column">
              <TextField
                label="Offer amount (UGX)"
                value={offerForm.amount}
                onChange={(event) =>
                  setOfferForm({ ...offerForm, amount: event.target.value })
                }
                required
              />
              <TextField
                label="Full name"
                value={offerForm.full_name}
                onChange={(event) =>
                  setOfferForm({ ...offerForm, full_name: event.target.value })
                }
                required
              />
              <TextField
                label="Phone number"
                value={offerForm.mobile_number}
                onChange={(event) =>
                  setOfferForm({
                    ...offerForm,
                    mobile_number: event.target.value,
                  })
                }
                required
              />
              <TextField
                label="Email"
                type="email"
                value={offerForm.email}
                onChange={(event) =>
                  setOfferForm({ ...offerForm, email: event.target.value })
                }
                required
              />
              <Box className="drawer-actions">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={closeOfferDrawer}
                >
                  Close
                </Button>
                <Button type="submit" variant="contained" size="large">
                  Submit offer
                </Button>
              </Box>
            </div>
          </Box>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={siteVisitDrawerOpen}
        onClose={closeSiteVisitDrawer}
      >
        <Box sx={{ width: { xs: 360, sm: 440 }, p: 3 }}>
          <Box component="form" onSubmit={handleSiteVisitSubmit}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Site Visit
            </Typography>
            <Typography color="text.secondary">
              {selectedListing
                ? `Book a visit for ${selectedListing.title}.`
                : "Book a visit and our team will confirm the schedule with you."}
            </Typography>
            <Divider sx={{ my: 2.5 }} />
            <div className="drawer-form drawer-form-compact">
              <TextField
                className="drawer-form-full"
                label="Your name"
                value={siteVisitForm.customer_name}
                onChange={(event) =>
                  setSiteVisitForm({
                    ...siteVisitForm,
                    customer_name: event.target.value,
                  })
                }
                required
              />
              <TextField
                className="drawer-form-full"
                label="Email"
                type="email"
                value={siteVisitForm.customer_email}
                onChange={(event) =>
                  setSiteVisitForm({
                    ...siteVisitForm,
                    customer_email: event.target.value,
                  })
                }
                required
              />
              <TextField
                className="drawer-form-full"
                label="Phone number"
                value={siteVisitForm.customer_mobile_number}
                onChange={(event) =>
                  setSiteVisitForm({
                    ...siteVisitForm,
                    customer_mobile_number: event.target.value,
                  })
                }
                required
              />
              <DatePicker
                label="Preferred date"
                value={siteVisitForm.scheduled_date}
                onChange={(value) =>
                  setSiteVisitForm({ ...siteVisitForm, scheduled_date: value })
                }
                slotProps={{ textField: { required: true } }}
              />
              <TimePicker
                label="Preferred time"
                value={siteVisitForm.scheduled_time}
                onChange={(value) =>
                  setSiteVisitForm({ ...siteVisitForm, scheduled_time: value })
                }
                slotProps={{ textField: { required: true } }}
              />
              <TextField
                className="drawer-form-full"
                label="Message"
                multiline
                minRows={3}
                value={siteVisitForm.message}
                onChange={(event) =>
                  setSiteVisitForm({
                    ...siteVisitForm,
                    message: event.target.value,
                  })
                }
              />
              <Box className="drawer-actions">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={closeSiteVisitDrawer}
                >
                  Close
                </Button>
                <Button type="submit" variant="contained" size="large">
                  Book site visit
                </Button>
              </Box>
            </div>
          </Box>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={drawerMode !== null}
        onClose={() => setDrawerMode(null)}
      >
        <Box sx={{ width: { xs: 360, sm: 420 }, p: 3 }}>
          {drawerMode === "login" ? (
            <Box component="form" onSubmit={handleLogin}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Login
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Sign in with email or phone number and password.
              </Typography>
              <div className="drawer-form">
                <TextField
                  label="Email or phone number"
                  value={loginForm.identifier}
                  onChange={(event) =>
                    setLoginForm({
                      ...loginForm,
                      identifier: event.target.value,
                    })
                  }
                />
                <TextField
                  label="Password"
                  type="password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm({ ...loginForm, password: event.target.value })
                  }
                />
                <Button type="submit" variant="contained" size="large">
                  Login
                </Button>
                <Button startIcon={<GoogleIcon />} variant="outlined">
                  Sign in with Google
                </Button>
                <Button onClick={() => setDrawerMode("signup")}>
                  Need an agent account? Sign up
                </Button>
              </div>
            </Box>
          ) : null}

          {drawerMode === "signup" ? (
            <Box component="form" onSubmit={handleSignup}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Agent signup
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Applications stay pending until approved by an admin.
              </Typography>
              <div className="drawer-form">
                <TextField
                  label="First name"
                  value={signupForm.first_name}
                  onChange={(event) =>
                    setSignupForm({
                      ...signupForm,
                      first_name: event.target.value,
                    })
                  }
                />
                <TextField
                  label="Last name"
                  value={signupForm.last_name}
                  onChange={(event) =>
                    setSignupForm({
                      ...signupForm,
                      last_name: event.target.value,
                    })
                  }
                />
                <TextField
                  label="Email"
                  value={signupForm.email}
                  onChange={(event) =>
                    setSignupForm({ ...signupForm, email: event.target.value })
                  }
                />
                <TextField
                  label="Phone number"
                  value={signupForm.phone_number}
                  onChange={(event) =>
                    setSignupForm({
                      ...signupForm,
                      phone_number: event.target.value,
                    })
                  }
                />
                <TextField
                  label="Password"
                  type="password"
                  value={signupForm.password}
                  onChange={(event) =>
                    setSignupForm({
                      ...signupForm,
                      password: event.target.value,
                    })
                  }
                />
                <Button type="submit" variant="contained" size="large">
                  Submit application
                </Button>
              </div>
            </Box>
          ) : null}

          {drawerMode === "profile" ? (
            <Box component="form" onSubmit={handleProfileSave}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Complete profile
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Finish the basics so the dashboard reflects a complete account.
              </Typography>
              <div className="drawer-form">
                <TextField
                  label="Address"
                  value={profileForm.address}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      address: event.target.value,
                    })
                  }
                />
                <TextField
                  label="Nationality"
                  value={profileForm.nationality}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      nationality: event.target.value,
                    })
                  }
                />
                <Button type="submit" variant="contained" size="large">
                  Save profile
                </Button>
              </div>
            </Box>
          ) : null}
        </Box>
      </Drawer>
      <Snackbar
        open={formAlert.open}
        autoHideDuration={5000}
        onClose={closeFormAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeFormAlert}
          severity={formAlert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {formAlert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function DashboardListingCard({
  listing,
  authorName,
  authorApproved,
  offerCount,
  siteVisitCount,
  onRegisterView,
  onOpenActions,
}: {
  listing: Listing;
  authorName: string;
  authorApproved: boolean;
  offerCount: number;
  siteVisitCount: number;
  onRegisterView: (listingId: number) => void;
  onOpenActions: (event: MouseEvent<HTMLElement>, listing: Listing) => void;
}) {
  return (
    <Card
      className="dashboard-listing-card"
      elevation={2}
      onClickCapture={() => onRegisterView(listing.id)}
      sx={{
        border: "1px solid rgba(17,17,17,0.08)",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {listing.status.toLowerCase() === "sold" ? (
        <div className="listing-sold-ribbon">Sold</div>
      ) : null}
      <CardMedia
        component="img"
        height="220"
        image={resolveImage(listing.thumbnail_url)}
        alt={listing.title}
      />
      <CardContent sx={{ display: "grid", gap: 1.5 }}>
        <div className="listing-top-row">
          <Chip
            label={listing.purpose ?? listing.category}
            color="primary"
            size="small"
          />
          <Chip
            label={formatPrice(listing.price)}
            variant="outlined"
            color="secondary"
            size="small"
          />
          <Chip
            label={`${listing.total_views} views`}
            size="small"
            className="listing-views-button"
            icon={<VisibilityOutlinedIcon fontSize="small" />}
          />
        </div>
        <Typography variant="h5">{listing.title}</Typography>
        <div className="dashboard-listing-author-row">
          <div className="dashboard-listing-author">
            <PersonOutlineOutlinedIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {authorName || "Unknown author"}
            </Typography>
            {authorApproved ? (
              <VerifiedIcon className="agent-verified-icon" fontSize="small" />
            ) : null}
          </div>
          <IconButton
            size="small"
            aria-label={`Open actions for ${listing.title}`}
            onClick={(event) => onOpenActions(event, listing)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="body2" color="text.secondary">
          {listing.description}
        </Typography>
        <div className="listing-meta-row">
          <Typography
            variant="body2"
            className="listing-meta-item"
            color="text.secondary"
          >
            <PlaceOutlinedIcon fontSize="inherit" />
            {listing.district}
            {listing.city ? `, ${listing.city}` : ""}
            {listing.size_text ? ` | ${listing.size_text}` : ""}
          </Typography>
          <Typography
            variant="body2"
            className="listing-meta-item"
            color="text.secondary"
          >
            <AccessTimeOutlinedIcon fontSize="inherit" />
            {formatTimeSincePosted(listing.created_at)}
          </Typography>
        </div>
        <div className="dashboard-listing-stats-row">
          <Chip
            label={`${offerCount} Offers`}
            size="small"
            color="warning"
          />
          <Chip
            label={`${siteVisitCount} Site Visits`}
            size="small"
            variant="outlined"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
