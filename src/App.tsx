import "./App.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import type {
  ChangeEvent,
  DragEvent,
  FormEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from "react";
import { useEffect, useRef, useState } from "react";
import type { Dayjs } from "dayjs";
import {
  Alert,
  Autocomplete,
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  CircularProgress,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  InputAdornment,
  Rating,
  Radio,
  RadioGroup,
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
import { BarChart } from "@mui/x-charts";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  type GridColDef,
} from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import SellIcon from "@mui/icons-material/Sell";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
import InsightsIcon from "@mui/icons-material/Insights";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
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

type ListingArticleLocationState = {
  backTo?: string;
};

type User = {
  id: number;
  username?: string | null;
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
  address?: string | null;
  category: string;
  size_text?: string | null;
  purpose?: string | null;
  status: string;
  approval_status?: string;
  is_featured: boolean;
  total_views: number;
  total_sales?: number;
  owner_id: number;
  created_at: string;
  thumbnail_url?: string | null;
  pictures?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  title_transfer_charges?: number | null;
  features?: ListingFeature[];
};

type ListingFeature = {
  id: number;
  category: string;
  title: string;
  listing_id: number;
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
  price_range?: string | null;
  purpose?: string | null;
  district?: string | null;
  village?: string | null;
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

type AvailabilityState = {
  checking: boolean;
  available: boolean | null;
  message: string;
};

type Note = {
  id: number;
  content: string;
  listing_id?: number | null;
  user_id?: number | null;
  site_visit_id?: number | null;
  offer_id?: number | null;
  wish_id?: number | null;
  created_at?: string;
};

type OperationalRecordKind = "wish" | "siteVisit" | "offer";

type SelectedOperationalRecord =
  | { kind: "wish"; record: Wish }
  | { kind: "siteVisit"; record: SiteVisit }
  | { kind: "offer"; record: Offer };

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
const LISTING_FEATURE_CATEGORIES: { label: string; icon: ReactNode }[] = [
  { label: "Utilities", icon: <AutoAwesomeOutlinedIcon fontSize="small" /> },
  { label: "Tenure", icon: <DescriptionIcon fontSize="small" /> },
  { label: "Title Transfer", icon: <ReceiptLongIcon fontSize="small" /> },
  { label: "Land Use", icon: <HomeWorkIcon fontSize="small" /> },
  { label: "Investment Plan", icon: <InsightsIcon fontSize="small" /> },
];

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
  "Analytics",
  "Wishes",
  "Site Visits",
  "Offers",
  "Reports",
];
const superAdminMenu = [...adminMenu, "Audit logs", "Users"];
const dashboardMenuIcons: Record<string, ReactNode> = {
  Listings: <HomeWorkIcon fontSize="small" />,
  Agents: <Groups2Icon fontSize="small" />,
  Wishes: <FavoriteIcon fontSize="small" />,
  "Site Visits": <EventAvailableIcon fontSize="small" />,
  Offers: <LocalOfferIcon fontSize="small" />,
  Reports: <DescriptionIcon fontSize="small" />,
  "Audit logs": <ReceiptLongIcon fontSize="small" />,
  Users: <PeopleAltIcon fontSize="small" />,
  "My Listings": <HomeWorkIcon fontSize="small" />,
  Analytics: <InsightsIcon fontSize="small" />,
  Profile: <PersonOutlineOutlinedIcon fontSize="small" />,
};

const defaultAgentThumbnails = [
  "https://ui-avatars.com/api/?name=SAM+Agent&background=f3ede4&color=ef5b2b&bold=true&format=svg",
  "https://ui-avatars.com/api/?name=Land+Agent&background=e8f1ff&color=0f172a&bold=true&format=svg",
  "https://ui-avatars.com/api/?name=Property+Pro&background=eaf7ed&color=166534&bold=true&format=svg",
  "https://ui-avatars.com/api/?name=Verified+Agent&background=fff3d7&color=92400e&bold=true&format=svg",
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

function formatStatusLabel(value?: string | null) {
  if (!value) return "";
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function getListingStatusLabel(listing: Listing) {
  if (listing.status?.toLowerCase() === "sold") return "Sold";
  return formatStatusLabel(listing.approval_status || listing.status);
}

function DashboardGridToolbar() {
  return (
    <GridToolbarContainer className="dashboard-grid-toolbar">
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function getListingPictureUrls(listing: Listing) {
  return (listing.pictures ?? "")
    .split(",")
    .map((picture) => picture.trim())
    .filter(Boolean);
}

function ListingCard({
  listing,
  onOpenSiteVisit,
  onOpenOffer,
  onRegisterView,
  onOpenArticle,
}: {
  listing: Listing;
  onOpenSiteVisit: (listing: Listing) => void;
  onOpenOffer: (listing: Listing) => void;
  onRegisterView: (listingId: number) => void;
  onOpenArticle: (listing: Listing) => void;
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
            className="listing-amount-chip"
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
            <Button
              variant="outlined"
              size="small"
              onClick={() => onOpenArticle(listing)}
            >
              Read More
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
  setHomeListingsTab: React.Dispatch<React.SetStateAction<"featured" | "all">>;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  handleFilterSubmit: (event: FormEvent) => void;
  showPreviousSlide: () => void;
  showNextSlide: () => void;
  onOpenWish: () => void;
  onOpenSiteVisit: (listing: Listing) => void;
  onOpenOffer: (listing: Listing) => void;
  onOpenArticle: (listing: Listing) => void;
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
  onOpenArticle,
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
  const visibleHomeListings = homeSourceListings.slice(
    0,
    visibleHomeListingsCount,
  );

  useEffect(() => {
    const target = homeListingsSectionRef.current;
    if (
      !target ||
      listingsLoading ||
      homeSourceListings.length <= visibleHomeListingsCount
    ) {
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
              onChange={(_, value: "featured" | "all") => {
                setVisibleHomeListingsCount(HOME_LISTINGS_BATCH_SIZE);
                setHomeListingsTab(value);
              }}
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
                          onOpenArticle={onOpenArticle}
                          onRegisterView={onRegisterView}
                        />
                      ))}
                    </div>
                  ) : (
                    <Box className="dashboard-empty-state">
                      <Typography variant="h6">
                        No listings available.
                      </Typography>
                      <Typography color="text.secondary">
                        There are no featured listings to show right now.
                      </Typography>
                    </Box>
                  )
                ) : visibleHomeListings.length ? (
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
                        onOpenArticle={onOpenArticle}
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

function ListingArticlePage({
  listings,
  onOpenSiteVisit,
  onOpenOffer,
  onOpenArticle,
  onRegisterView,
  getViewerKey,
}: {
  listings: Listing[];
  onOpenSiteVisit: (listing: Listing) => void;
  onOpenOffer: (listing: Listing) => void;
  onOpenArticle: (listing: Listing) => void;
  onRegisterView: (listingId: number) => void;
  getViewerKey: () => string;
}) {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [siteRating, setSiteRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    let ignore = false;
    setLoading(true);
    setSiteRating(null);
    api
      .get<Listing>(`/listings/${listingId}`)
      .then((response) => {
        if (ignore) return;
        setListing(response.data);
        setSelectedImage(resolveImage(response.data.thumbnail_url));
        onRegisterView(response.data.id);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [listingId]);

  if (loading) {
    return <PageLoader />;
  }

  if (!listing) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box className="dashboard-empty-state">
          <Typography variant="h6">Listing not found.</Typography>
          <Typography color="text.secondary">
            The article you are looking for is unavailable.
          </Typography>
        </Box>
      </Container>
    );
  }

  const galleryImages = [
    listing.thumbnail_url,
    ...getListingPictureUrls(listing),
  ]
    .filter(Boolean)
    .filter((image, index, images) => images.indexOf(image) === index)
    .slice(0, 5) as string[];
  const mapQuery =
    listing.latitude != null && listing.longitude != null
      ? `${listing.latitude},${listing.longitude}`
      : [listing.address, listing.city, listing.district]
          .filter(Boolean)
          .join(", ");
  const suggestedListings = listings
    .filter((item) => item.id !== listing.id)
    .sort((first, second) => {
      const firstMatchesDistrict = first.district === listing.district ? 0 : 1;
      const secondMatchesDistrict =
        second.district === listing.district ? 0 : 1;
      return firstMatchesDistrict - secondMatchesDistrict;
    })
    .slice(0, 4);
  const featuresByCategory = LISTING_FEATURE_CATEGORIES.map((category) => ({
    ...category,
    features:
      listing.features?.filter(
        (feature) =>
          feature.category.trim().toLowerCase() ===
          category.label.toLowerCase(),
      ) ?? [],
  }));
  const selectedImageIndex = Math.max(
    0,
    galleryImages.findIndex(
      (image) =>
        resolveImage(image) ===
        (selectedImage || resolveImage(listing.thumbnail_url)),
    ),
  );
  const showGalleryControls = galleryImages.length > 1;

  function showPreviousImage() {
    const previousIndex =
      selectedImageIndex === 0
        ? galleryImages.length - 1
        : selectedImageIndex - 1;
    setSelectedImage(resolveImage(galleryImages[previousIndex]));
  }

  function showNextImage() {
    const nextIndex =
      selectedImageIndex === galleryImages.length - 1
        ? 0
        : selectedImageIndex + 1;
    setSelectedImage(resolveImage(galleryImages[nextIndex]));
  }

  function handleBackClick() {
    const state = location.state as ListingArticleLocationState | null;
    navigate(state?.backTo ?? "/");
  }

  async function handleSiteRatingChange(value: number | null) {
    if (!value || !listing) return;

    setSiteRating(value);

    try {
      await api.post(`/listings/${listing.id}/reaction`, {
        viewer_key: getViewerKey(),
        rating: value,
      });
    } catch {
      setSiteRating(null);
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <div className="listing-article-page">
        <div className="page-hero">
          <IconButton
            aria-label="Go back"
            className="listing-back-button"
            onClick={handleBackClick}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3">{listing.title}</Typography>
          <Typography color="text.secondary">
            {[listing.address, listing.city, listing.district]
              .filter(Boolean)
              .join(", ")}
          </Typography>
        </div>
        <div className="listing-article-layout">
          <div className="listing-article-media">
            <div className="listing-article-image-stage">
              <CardMedia
                component="img"
                className="listing-article-main-image"
                image={selectedImage || resolveImage(listing.thumbnail_url)}
                alt={listing.title}
              />
              {showGalleryControls ? (
                <>
                  <IconButton
                    className="listing-gallery-nav listing-gallery-nav-previous"
                    aria-label="Show previous listing image"
                    onClick={showPreviousImage}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    className="listing-gallery-nav listing-gallery-nav-next"
                    aria-label="Show next listing image"
                    onClick={showNextImage}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </>
              ) : null}
            </div>
            <div className="listing-gallery-preview-row">
              {galleryImages.length ? (
                <div className="listing-article-thumbnails">
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      className={`listing-article-thumbnail${
                        index === selectedImageIndex
                          ? " listing-article-thumbnail-active"
                          : ""
                      }`}
                      onClick={() => setSelectedImage(resolveImage(image))}
                    >
                      <img
                        src={resolveImage(image)}
                        alt={`${listing.title} ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="listing-gallery-actions">
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
              </div>
              <div className="listing-gallery-rating">
                <Typography variant="body2" color="text.secondary">
                  Rate this site
                </Typography>
                <Rating
                  value={siteRating}
                  precision={0.5}
                  onChange={(_, value) => void handleSiteRatingChange(value)}
                />
              </div>
            </div>
          </div>
          <div className="listing-article-copy">
            <div className="listing-top-row">
              <Chip
                label={listing.purpose ?? listing.category}
                color="primary"
              />
              <Chip
                label={formatPrice(listing.price)}
                color="secondary"
                variant="outlined"
                className="listing-amount-chip"
              />
              <Chip
                label={`${listing.total_views} views`}
                icon={<VisibilityOutlinedIcon fontSize="small" />}
              />
            </div>
            <Typography variant="body1" color="text.secondary">
              {listing.description}
            </Typography>
            <div className="listing-article-info-grid">
              <div className="listing-article-details">
                <Typography>
                  <strong>District:</strong> {listing.district}
                </Typography>
                <Typography>
                  <strong>City:</strong> {listing.city || "Not added"}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {listing.address || "Not added"}
                </Typography>
                <Typography>
                  <strong>Category:</strong> {listing.category}
                </Typography>
                <Typography>
                  <strong>Size:</strong> {listing.size_text || "Not added"}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {listing.status}
                </Typography>
                <Typography>
                  <strong>Title transfer charges:</strong>{" "}
                  {listing.title_transfer_charges
                    ? formatPrice(listing.title_transfer_charges)
                    : "Not added"}
                </Typography>
                <Typography>
                  <strong>Posted:</strong>{" "}
                  {formatTimeSincePosted(listing.created_at)}
                </Typography>
              </div>
              <div className="listing-article-features">
                <Typography variant="h6">Site Features</Typography>
                <Divider />
                <div className="listing-feature-category-list">
                  {featuresByCategory.map(({ label, icon, features }) => (
                    <div key={label} className="listing-feature-category">
                      <Typography
                        variant="subtitle2"
                        className="listing-feature-category-title"
                      >
                        {icon}
                        {label}
                      </Typography>
                      {features.length ? (
                        <div className="listing-feature-list">
                          {features.map((feature) => (
                            <Typography
                              key={feature.id}
                              variant="body2"
                              className="listing-feature-item"
                            >
                              {feature.title}
                            </Typography>
                          ))}
                        </div>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No features added.
                        </Typography>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="listing-article-map-section">
          <Paper className="listing-you-may-like-card" elevation={2}>
            <Typography variant="h5">Listings you may like</Typography>
            <div className="listing-suggestions-list">
              {suggestedListings.length ? (
                suggestedListings.map((suggestedListing) => (
                  <button
                    key={suggestedListing.id}
                    type="button"
                    className="listing-suggestion-row"
                    onClick={() => onOpenArticle(suggestedListing)}
                  >
                    <img
                      src={resolveImage(suggestedListing.thumbnail_url)}
                      alt={suggestedListing.title}
                      className="listing-suggestion-image"
                    />
                    <span className="listing-suggestion-copy">
                      <Typography variant="subtitle2">
                        {suggestedListing.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {suggestedListing.district}
                        {suggestedListing.city
                          ? `, ${suggestedListing.city}`
                          : ""}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="listing-suggestion-price"
                      >
                        {formatPrice(suggestedListing.price)}
                      </Typography>
                    </span>
                  </button>
                ))
              ) : (
                <Typography color="text.secondary">
                  More listings will appear here soon.
                </Typography>
              )}
            </div>
          </Paper>
          <Paper className="listing-article-map" elevation={2}>
            <Typography variant="h5">Site Location</Typography>
            <Divider />
            <iframe
              title={`Map for ${listing.title}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              loading="lazy"
            />
          </Paper>
        </div>
      </div>
    </Container>
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
  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);
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
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
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
  const [, setStats] = useState<DashboardStats | null>(null);
  const [agents, setAgents] = useState<User[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(() => {
    return (
      window.localStorage.getItem(DASHBOARD_MENU_STORAGE_KEY) ?? "Listings"
    );
  });
  const [listingsTab, setListingsTab] = useState<"all" | "featured" | "for-you">("all");
  const [analyticsTab, setAnalyticsTab] = useState<
    "listings" | "agents" | "site"
  >("listings");
  const [analyticsDateRange, setAnalyticsDateRange] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({
    start: null,
    end: null,
  });
  const [analyticsStatusFilter, setAnalyticsStatusFilter] = useState<
    "approved" | "pending" | "rejected" | "sold" | null
  >(null);
  const [analyticsPeriod, setAnalyticsPeriod] = useState<
    "custom" | "week" | "month" | "year"
  >("custom");
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
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    district: "",
    village: "",
    experience: "",
    nationality: "",
  });
  const [signupAvailability, setSignupAvailability] = useState<
    Record<"username" | "email" | "phone_number", AvailabilityState>
  >({
    username: { checking: false, available: null, message: "" },
    email: { checking: false, available: null, message: "" },
    phone_number: { checking: false, available: null, message: "" },
  });
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null,
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [listingDrawerOpen, setListingDrawerOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [wishDrawerOpen, setWishDrawerOpen] = useState(false);
  const [siteVisitDrawerOpen, setSiteVisitDrawerOpen] = useState(false);
  const [offerDrawerOpen, setOfferDrawerOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [saleDialogOpen, setSaleDialogOpen] = useState(false);
  const [saleForm, setSaleForm] = useState({
    sale_price: "",
    sold_at: null as Dayjs | null,
  });
  const [selectedAgent, setSelectedAgent] = useState<User | null>(null);
  const [recordActionAnchor, setRecordActionAnchor] =
    useState<HTMLElement | null>(null);
  const [selectedOperationalRecord, setSelectedOperationalRecord] =
    useState<SelectedOperationalRecord | null>(null);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [forwardWishDialogOpen, setForwardWishDialogOpen] = useState(false);
  const [forwardWishMode, setForwardWishMode] = useState<
    "district" | "village" | "individual"
  >("district");
  const [forwardWishAgents, setForwardWishAgents] = useState<User[]>([]);
  const [recordStatusForm, setRecordStatusForm] = useState("pending");
  const [noteForm, setNoteForm] = useState("");
  const [adminUserForm, setAdminUserForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "admin" as "admin" | "super_admin",
    status: "active",
  });
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
  const [listingForm, setListingForm] = useState({
    title: "",
    description: "",
    price: "",
    district: "",
    city: "",
    address: "",
    category: "Residential Land",
    size_text: "",
    purpose: "Residential",
    thumbnail_url: "",
    pictures: "",
    latitude: "",
    longitude: "",
    title_transfer_charges: "",
  });
  const [editListingOpen, setEditListingOpen] = useState(false);
  const [editListingForm, setEditListingForm] = useState({
    title: "",
    description: "",
    price: "",
    district: "",
    city: "",
    address: "",
    category: "",
    size_text: "",
    purpose: "",
    latitude: "",
    longitude: "",
    title_transfer_charges: "",
  });
  const [picturesDialogOpen, setPicturesDialogOpen] = useState(false);
  const [featuresDialogOpen, setFeaturesDialogOpen] = useState(false);
  const [featureForm, setFeatureForm] = useState({
    category: LISTING_FEATURE_CATEGORIES[0].label,
    title: "",
  });
  const [listingPictureFiles, setListingPictureFiles] = useState<
    Array<File | null>
  >([null, null, null, null, null]);
  const [listingPicturePreviews, setListingPicturePreviews] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [formAlert, setFormAlert] = useState<FormAlertState>({
    open: false,
    severity: "success",
    message: "",
  });
  const [submittingForms, setSubmittingForms] = useState<Set<string>>(
    () => new Set(),
  );
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
    if (drawerMode !== "profile" || !user) return;

    setProfileForm({
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      phone_number: user.phone_number ?? "",
      address: user.address ?? "",
      district: user.district ?? "",
      village: user.village ?? "",
      experience: user.experience ?? "",
      nationality: user.nationality ?? "",
    });
    setProfilePictureFile(null);
    setProfilePicturePreview("");
  }, [drawerMode, user]);

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
    const checks: Array<["username" | "email" | "phone_number", string]> = [
      ["username", signupForm.username],
      ["email", signupForm.email],
      ["phone_number", signupForm.phone_number],
    ];

    const timers = checks.map(([field, value]) =>
      window.setTimeout(() => {
        const trimmed = value.trim();
        if (!trimmed) {
          setSignupAvailability((current) => ({
            ...current,
            [field]: { checking: false, available: null, message: "" },
          }));
          return;
        }

        setSignupAvailability((current) => ({
          ...current,
          [field]: { ...current[field], checking: true },
        }));
        api
          .get<AvailabilityState & { field: string }>("/auth/check-availability", {
            params: { field, value: trimmed },
          })
          .then((response) => {
            setSignupAvailability((current) => ({
              ...current,
              [field]: {
                checking: false,
                available: response.data.available,
                message: response.data.message,
              },
            }));
          })
          .catch(() => {
            setSignupAvailability((current) => ({
              ...current,
              [field]: {
                checking: false,
                available: false,
                message: "Unable to check availability",
              },
            }));
          });
      }, 450),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [signupForm.email, signupForm.phone_number, signupForm.username]);

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
      setSelectedMenu(selectedMenu === "Settings" ? "Users" : menuItems[0]);
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

  function getOperationalNoteCount(kind: OperationalRecordKind, id: number) {
    if (kind === "wish") {
      return notes.filter((note) => note.wish_id === id).length;
    }
    if (kind === "siteVisit") {
      return notes.filter((note) => note.site_visit_id === id).length;
    }
    return notes.filter((note) => note.offer_id === id).length;
  }

  function openRecordActionMenu(
    event: MouseEvent<HTMLElement>,
    record: SelectedOperationalRecord,
  ) {
    setRecordActionAnchor(event.currentTarget);
    setSelectedOperationalRecord(record);
  }

  function closeRecordActionMenu() {
    setRecordActionAnchor(null);
  }

  function closeOperationalDialogs() {
    setProgressDialogOpen(false);
    setNoteDialogOpen(false);
    setForwardWishDialogOpen(false);
    setSelectedOperationalRecord(null);
    setRecordStatusForm("pending");
    setNoteForm("");
    setForwardWishMode("district");
    setForwardWishAgents([]);
  }

  function openForwardWishDialog() {
    if (!selectedOperationalRecord || selectedOperationalRecord.kind !== "wish") {
      return;
    }
    closeRecordActionMenu();
    setForwardWishMode("district");
    setForwardWishAgents([]);
    setForwardWishDialogOpen(true);
  }

  function toggleAnalyticsStatusFilter(
    status: "approved" | "pending" | "rejected" | "sold",
  ) {
    setAnalyticsStatusFilter((current) => (current === status ? null : status));
  }

  function resetAdminUserForm() {
    setAdminUserForm({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      role: "admin",
      status: "active",
    });
  }

  function closeUserDrawer() {
    setUserDrawerOpen(false);
    resetAdminUserForm();
  }

  function setFormSubmitting(formName: string, submitting: boolean) {
    setSubmittingForms((current) => {
      const next = new Set(current);
      if (submitting) {
        next.add(formName);
      } else {
        next.delete(formName);
      }
      return next;
    });
  }

  function isSubmitting(formName: string) {
    return submittingForms.has(formName);
  }

  function getSubmitProgress(formName: string) {
    return isSubmitting(formName) ? (
      <CircularProgress size={18} color="inherit" />
    ) : null;
  }

  function getListingAuthorCanManageContent(listing: Listing | null) {
    if (!listing || !user) return false;
    if (user.role === "agent") return listing.owner_id === user.id;
    if (user.role !== "admin" && user.role !== "super_admin") return false;

    const author = getListingAuthor(listing);
    return author?.role === "admin" || author?.role === "super_admin";
  }

  function getListingTitle(listingId: number) {
    return (
      latestListings.find((listing) => listing.id === listingId)?.title ??
      `Listing #${listingId}`
    );
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
        api.get<Note[]>("/notes"),
      ] as const;

      if (activeUser.role === "admin" || activeUser.role === "super_admin") {
        const [
          statsResponse,
          listingsResponse,
          offersResponse,
          siteVisitsResponse,
          notesResponse,
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
        setNotes(notesResponse.data);
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
          notesResponse,
          wishesResponse,
        ] = await Promise.all([
          ...dashboardRequests,
          api.get<Wish[]>("/wishes"),
        ]);

        setStats(statsResponse.data);
        setLatestListings(listingsResponse.data);
        setOffers(offersResponse.data);
        setSiteVisits(siteVisitsResponse.data);
        setNotes(notesResponse.data);
        setWishes(wishesResponse.data);
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
    setFormSubmitting("login", true);
    try {
      const response = await api.post<{ user: User }>("/auth/login", {
        identifier: loginForm.identifier.trim(),
        password: loginForm.password.trim(),
      });
      setUser(response.data.user);
      setSelectedMenu(
        response.data.user.role === "agent" ? "My Listings" : "Listings",
      );
      setDrawerMode(null);
      navigate("/dashboard");
    } catch (error) {
      setUser(null);
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
    } finally {
      setFormSubmitting("login", false);
    }
  }

  const normalizedListingSearch = listingSearch.trim().toLowerCase();
  const filteredDashboardListings = (
    listingsTab === "for-you"
      ? latestListings.filter((listing) => listing.owner_id === user?.id)
      : listingsTab === "featured"
        ? latestListings.filter((listing) => listing.is_featured)
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
          Math.min(
            current + LISTINGS_BATCH_SIZE,
            filteredDashboardListings.length,
          ),
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
    if (
      signupAvailability.username.available === false ||
      signupAvailability.email.available === false ||
      signupAvailability.phone_number.available === false
    ) {
      showFormAlert("error", "Please use an available username, email, and mobile number.");
      return;
    }
    setFormSubmitting("signup", true);
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
    } finally {
      setFormSubmitting("signup", false);
    }
  }

  async function handleAdminUserSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;

    setFormSubmitting("admin-user-create", true);
    try {
      await api.post<User>("/users", {
        username: adminUserForm.username,
        email: adminUserForm.email,
        phone_number: adminUserForm.phone_number,
        role: adminUserForm.role,
        status: adminUserForm.status,
        first_name: adminUserForm.first_name,
        last_name: adminUserForm.last_name,
        full_name:
          `${adminUserForm.first_name} ${adminUserForm.last_name}`.trim() ||
          adminUserForm.email,
        password: adminUserForm.password,
      });
      closeUserDrawer();
      await loadDashboard(user);
      showFormAlert("success", "User added successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to add this user right now."),
      );
    } finally {
      setFormSubmitting("admin-user-create", false);
    }
  }

  function handleProfilePictureSelection(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showFormAlert("error", "Please choose an image file for your profile.");
      return;
    }

    setProfilePictureFile(file);
    setProfilePicturePreview(URL.createObjectURL(file));
  }

  function handleProfilePictureInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    handleProfilePictureSelection(event.target.files);
  }

  function handleProfilePictureDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleProfilePictureSelection(event.dataTransfer.files);
  }

  async function handleProfileSave(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setFormSubmitting("profile", true);
    try {
      let profilePictureUrl = user.profile_picture ?? null;
      if (profilePictureFile) {
        const formData = new FormData();
        formData.append("files", profilePictureFile);
        const uploadResponse = await api.post<{ urls: string[] }>(
          "/uploads/images",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        profilePictureUrl = uploadResponse.data.urls[0] ?? profilePictureUrl;
      }

      const response = await api.patch<User>(`/users/${user.id}`, {
        first_name: profileForm.first_name,
        last_name: profileForm.last_name,
        full_name:
          `${profileForm.first_name} ${profileForm.last_name}`.trim() ||
          user.full_name,
        phone_number: profileForm.phone_number,
        address: profileForm.address,
        district: profileForm.district,
        village: profileForm.village,
        experience: profileForm.experience,
        nationality: profileForm.nationality,
        profile_picture: profilePictureUrl,
      });
      setUser(response.data);
      setProfilePictureFile(null);
      setProfilePicturePreview("");
      setDrawerMode(null);
      showFormAlert("success", "Profile saved successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to save your profile right now."),
      );
    } finally {
      setFormSubmitting("profile", false);
    }
  }

  async function handleListingSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;

    setFormSubmitting("listing-create", true);
    try {
      await api.post("/listings", {
        title: listingForm.title,
        description: listingForm.description,
        price: Number(listingForm.price),
        district: listingForm.district,
        city: listingForm.city || null,
        address: listingForm.address || null,
        owner_id: user.id,
        category: listingForm.category || "Land",
        size_text: listingForm.size_text || null,
        purpose: listingForm.purpose || null,
        thumbnail_url: listingForm.thumbnail_url || null,
        pictures: listingForm.pictures
          .split(/[\n,]/)
          .map((picture) => picture.trim())
          .filter(Boolean),
        latitude: listingForm.latitude ? Number(listingForm.latitude) : null,
        longitude: listingForm.longitude ? Number(listingForm.longitude) : null,
        title_transfer_charges: listingForm.title_transfer_charges
          ? Number(listingForm.title_transfer_charges)
          : null,
        status: "available",
        approval_status: "approved",
      });
      setListingForm({
        title: "",
        description: "",
        price: "",
        district: "",
        city: "",
        address: "",
        category: "Residential Land",
        size_text: "",
        purpose: "Residential",
        thumbnail_url: "",
        pictures: "",
        latitude: "",
        longitude: "",
        title_transfer_charges: "",
      });
      setListingDrawerOpen(false);
      setSelectedMenu("My Listings");
      await loadDashboard(user);
      showFormAlert("success", "Listing created successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to create this listing right now."),
      );
    } finally {
      setFormSubmitting("listing-create", false);
    }
  }

  async function handleListingEditSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || !selectedListing) return;

    setFormSubmitting("listing-edit", true);
    try {
      await api.patch<Listing>(`/listings/${selectedListing.id}`, {
        title: editListingForm.title,
        description: editListingForm.description,
        price: Number(editListingForm.price),
        district: editListingForm.district,
        city: editListingForm.city || null,
        address: editListingForm.address || null,
        category: editListingForm.category || "Land",
        size_text: editListingForm.size_text || null,
        purpose: editListingForm.purpose || null,
        latitude: editListingForm.latitude
          ? Number(editListingForm.latitude)
          : null,
        longitude: editListingForm.longitude
          ? Number(editListingForm.longitude)
          : null,
        title_transfer_charges: editListingForm.title_transfer_charges
          ? Number(editListingForm.title_transfer_charges)
          : null,
      });
      closeEditListingDialog();
      await loadDashboard(user);
      showFormAlert("success", "Listing updated successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to update this listing right now."),
      );
    } finally {
      setFormSubmitting("listing-edit", false);
    }
  }

  async function handleListingPicturesSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || !selectedListing) return;

    setFormSubmitting("listing-pictures", true);
    try {
      const uploadedUrls = [...listingPicturePreviews];
      const formData = new FormData();
      const uploadIndexes: number[] = [];

      listingPictureFiles.forEach((file, index) => {
        if (!file) return;
        uploadIndexes.push(index);
        formData.append("files", file);
      });

      if (uploadIndexes.length) {
        const uploadResponse = await api.post<{ urls: string[] }>(
          "/uploads/images",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        uploadIndexes.forEach((index, responseIndex) => {
          uploadedUrls[index] = uploadResponse.data.urls[responseIndex] ?? "";
        });
      }

      const [thumbnailUrl, ...variationUrls] = uploadedUrls.map((url) =>
        url.trim(),
      );
      await api.patch<Listing>(`/listings/${selectedListing.id}`, {
        thumbnail_url: thumbnailUrl || null,
        pictures: variationUrls.filter(Boolean).slice(0, 4),
      });
      closePicturesDialog();
      await loadDashboard(user);
      showFormAlert("success", "Listing pictures saved successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to save listing pictures right now."),
      );
    } finally {
      setFormSubmitting("listing-pictures", false);
    }
  }

  async function handleFeatureSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedListing) return;

    setFormSubmitting("listing-feature", true);
    try {
      await api.post<ListingFeature>("/features", {
        listing_id: selectedListing.id,
        category: featureForm.category,
        title: featureForm.title,
      });
      setFeatureForm({
        category: LISTING_FEATURE_CATEGORIES[0].label,
        title: "",
      });
      if (user) {
        await loadDashboard(user);
      }
      showFormAlert("success", "Feature added successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to add this feature right now."),
      );
    } finally {
      setFormSubmitting("listing-feature", false);
    }
  }

  async function handleListingDelete() {
    if (!user || !selectedListing) return;
    const listingTitle = selectedListing.title;

    try {
      await api.delete(`/listings/${selectedListing.id}`);
      handleListingActionClose();
      setSelectedListing(null);
      await loadDashboard(user);
      showFormAlert("success", `${listingTitle} deleted successfully.`);
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to delete this listing right now."),
      );
    }
  }

  async function handleListingAdminAction(
    action: "approve" | "feature" | "reject" | "deactivate" | "sold" | "delete",
  ) {
    if (!user || !selectedListing) return;

    if (action === "delete") {
      await handleListingDelete();
      return;
    }

    const updates: Partial<Listing> = {};
    if (action === "approve") {
      updates.approval_status = "approved";
      updates.status = "available";
    }
    if (action === "feature") {
      updates.is_featured = true;
    }
    if (action === "reject") {
      updates.approval_status = "rejected";
    }
    if (action === "deactivate") {
      updates.status = "deactivated";
    }
    if (action === "sold") {
      updates.status = "sold";
    }

    try {
      await api.patch<Listing>(`/listings/${selectedListing.id}`, updates);
      handleListingActionClose();
      setSelectedListing(null);
      await loadDashboard(user);
      showFormAlert("success", "Listing updated successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to update this listing right now."),
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

  function handleAgentActionOpen(event: MouseEvent<HTMLElement>, agent: User) {
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
    listing: Listing,
  ) {
    event.stopPropagation();
    setSelectedListing(listing);
    setListingActionAnchor(event.currentTarget);
  }

  function handleListingActionClose() {
    setListingActionAnchor(null);
  }

  function openSaleDialog() {
    handleListingActionClose();
    setSaleForm({
      sale_price: selectedListing?.price ? String(selectedListing.price) : "",
      sold_at: null,
    });
    setSaleDialogOpen(true);
  }

  function closeSaleDialog() {
    setSaleDialogOpen(false);
    setSaleForm({ sale_price: "", sold_at: null });
    setSelectedListing(null);
  }

  async function handleListingSaleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || !selectedListing || !saleForm.sold_at) return;

    setFormSubmitting("listing-sale", true);
    try {
      await api.post(`/listings/${selectedListing.id}/sale`, {
        sale_price: Number(saleForm.sale_price),
        sold_at: saleForm.sold_at.format("YYYY-MM-DD"),
        registered_by_id: user.id,
      });
      closeSaleDialog();
      await loadDashboard(user);
      showFormAlert("success", "Listing sale registered successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to register this listing sale right now."),
      );
    } finally {
      setFormSubmitting("listing-sale", false);
    }
  }

  function openArticlePage(listing: Listing) {
    void registerListingView(listing.id);
    const currentArticleState =
      location.state as ListingArticleLocationState | null;
    const backTo = location.pathname.startsWith("/listings/")
      ? (currentArticleState?.backTo ?? "/")
      : location.pathname === "/dashboard"
        ? "/dashboard"
        : "/";

    navigate(`/listings/${listing.id}`, { state: { backTo } });
  }

  function openEditListingDialog() {
    if (!selectedListing) return;
    setEditListingForm({
      title: selectedListing.title,
      description: selectedListing.description,
      price: String(selectedListing.price ?? ""),
      district: selectedListing.district,
      city: selectedListing.city ?? "",
      address: selectedListing.address ?? "",
      category: selectedListing.category,
      size_text: selectedListing.size_text ?? "",
      purpose: selectedListing.purpose ?? "",
      latitude:
        selectedListing.latitude != null
          ? String(selectedListing.latitude)
          : "",
      longitude:
        selectedListing.longitude != null
          ? String(selectedListing.longitude)
          : "",
      title_transfer_charges:
        selectedListing.title_transfer_charges != null
          ? String(selectedListing.title_transfer_charges)
          : "",
    });
    setEditListingOpen(true);
    handleListingActionClose();
  }

  function closeEditListingDialog() {
    setEditListingOpen(false);
    setSelectedListing(null);
  }

  function openPicturesDialog() {
    if (!selectedListing) return;
    setListingPictureFiles([null, null, null, null, null]);
    setListingPicturePreviews(
      [
        selectedListing.thumbnail_url ?? "",
        ...getListingPictureUrls(selectedListing).slice(0, 4),
      ]
        .concat(["", "", "", "", ""])
        .slice(0, 5),
    );
    setPicturesDialogOpen(true);
    handleListingActionClose();
  }

  function closePicturesDialog() {
    setPicturesDialogOpen(false);
    setSelectedListing(null);
  }

  function openFeaturesDialog() {
    if (!selectedListing) return;
    setFeatureForm({
      category: LISTING_FEATURE_CATEGORIES[0].label,
      title: "",
    });
    setFeaturesDialogOpen(true);
    handleListingActionClose();
  }

  function closeFeaturesDialog() {
    setFeaturesDialogOpen(false);
    setSelectedListing(null);
  }

  function openListingDrawer() {
    setListingDrawerOpen(true);
  }

  function handlePicturePick(index: number, file: File | null) {
    setListingPictureFiles((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? file : item)),
    );
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setListingPicturePreviews((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? previewUrl : item,
      ),
    );
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
        getApiErrorMessage(
          error,
          `Unable to ${action} this profile right now.`,
        ),
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

  function renderProfileFormContent() {
    return (
      <Box component="form" onSubmit={handleProfileSave}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Complete profile
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Keep your public agent details complete for customers and admins.
        </Typography>
        <div className="drawer-form drawer-form-compact">
          <Box
            className="profile-picture-dropzone drawer-form-full"
            onDrop={handleProfilePictureDrop}
            onDragOver={(event) => event.preventDefault()}
            onClick={() => profilePictureInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                profilePictureInputRef.current?.click();
              }
            }}
          >
            <CardMedia
              component="img"
              className="profile-picture-preview"
              image={
                profilePicturePreview ||
                resolveAgentImage(user?.profile_picture, user?.id ?? 0)
              }
              alt="Profile preview"
            />
            <div>
              <Typography variant="subtitle1">Upload profile picture</Typography>
              <Typography variant="body2" color="text.secondary">
                Drag and drop an image here, or click to browse.
              </Typography>
              {profilePictureFile ? (
                <Chip size="small" label={profilePictureFile.name} />
              ) : null}
            </div>
            <input
              ref={profilePictureInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfilePictureInputChange}
            />
          </Box>
          <TextField
            label="First name"
            value={profileForm.first_name}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                first_name: event.target.value,
              })
            }
          />
          <TextField
            label="Last name"
            value={profileForm.last_name}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                last_name: event.target.value,
              })
            }
          />
          <TextField
            label="Phone number"
            value={profileForm.phone_number}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                phone_number: event.target.value,
              })
            }
          />
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
            label="District"
            value={profileForm.district}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                district: event.target.value,
              })
            }
          />
          <TextField
            label="Village / area"
            value={profileForm.village}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                village: event.target.value,
              })
            }
          />
          <TextField
            label="Experience"
            value={profileForm.experience}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                experience: event.target.value,
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
          <Box className="drawer-actions">
            <Button
              variant="outlined"
              size="large"
              onClick={() => setDrawerMode(null)}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting("profile")}
              startIcon={getSubmitProgress("profile")}
            >
              Save profile
            </Button>
          </Box>
        </div>
      </Box>
    );
  }

  function renderListingFormContent() {
    return (
      <Box component="form" onSubmit={handleListingSubmit}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Create listing
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Add a property to your dashboard and make it available to customers.
        </Typography>
        <div className="drawer-form drawer-form-compact">
          <TextField
            className="drawer-form-full"
            label="Listing title"
            value={listingForm.title}
            onChange={(event) =>
              setListingForm({ ...listingForm, title: event.target.value })
            }
            required
          />
          <TextField
            className="drawer-form-full"
            label="Description"
            value={listingForm.description}
            onChange={(event) =>
              setListingForm({
                ...listingForm,
                description: event.target.value,
              })
            }
            multiline
            minRows={3}
            required
          />
          <TextField
            label="District"
            value={listingForm.district}
            onChange={(event) =>
              setListingForm({ ...listingForm, district: event.target.value })
            }
            required
          />
          <TextField
            label="City"
            value={listingForm.city}
            onChange={(event) =>
              setListingForm({ ...listingForm, city: event.target.value })
            }
          />
          <TextField
            label="Address"
            value={listingForm.address}
            onChange={(event) =>
              setListingForm({ ...listingForm, address: event.target.value })
            }
          />
          <TextField
            label="Category"
            value={listingForm.category}
            onChange={(event) =>
              setListingForm({ ...listingForm, category: event.target.value })
            }
          />
          <TextField
            label="Purpose"
            value={listingForm.purpose}
            onChange={(event) =>
              setListingForm({ ...listingForm, purpose: event.target.value })
            }
          />
          <TextField
            label="Size"
            value={listingForm.size_text}
            onChange={(event) =>
              setListingForm({ ...listingForm, size_text: event.target.value })
            }
          />
          <TextField
            label="Price"
            value={listingForm.price}
            onChange={(event) =>
              setListingForm({ ...listingForm, price: event.target.value })
            }
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">UGX</InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Title transfer charges"
            value={listingForm.title_transfer_charges}
            onChange={(event) =>
              setListingForm({
                ...listingForm,
                title_transfer_charges: event.target.value,
              })
            }
          />
          <TextField
            label="Latitude"
            value={listingForm.latitude}
            onChange={(event) =>
              setListingForm({ ...listingForm, latitude: event.target.value })
            }
          />
          <TextField
            label="Longitude"
            value={listingForm.longitude}
            onChange={(event) =>
              setListingForm({ ...listingForm, longitude: event.target.value })
            }
          />
          <Box className="drawer-actions">
            <Button
              variant="outlined"
              size="large"
              onClick={() => setListingDrawerOpen(false)}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting("listing-create")}
              startIcon={getSubmitProgress("listing-create")}
            >
              Create listing
            </Button>
          </Box>
        </div>
      </Box>
    );
  }

  function getDashboardMenuItems(activeUser: User) {
    return activeUser.role === "super_admin"
      ? superAdminMenu
      : activeUser.role === "admin"
        ? adminMenu
        : ["My Listings", "Analytics", "Profile"];
  }

  function getDashboardMenuBadgeCount(item: string) {
    const isPending = (status?: string | null) =>
      (status ?? "").toLowerCase() === "pending";

    if (item === "Listings") {
      return latestListings.filter((listing) =>
        isPending(listing.approval_status),
      ).length;
    }
    if (item === "Agents") {
      return agents.filter((agent) => isPending(agent.status)).length;
    }
    if (item === "Offers") {
      return offers.filter((offer) => isPending(offer.status)).length;
    }
    if (item === "Site Visits") {
      return siteVisits.filter((visit) => isPending(visit.status)).length;
    }
    if (item === "Wishes") {
      return wishes.filter((wish) => isPending(wish.status)).length;
    }
    return 0;
  }

  function renderAnalyticsPanel() {
    const isWithinAnalyticsRange = (value?: string | null) => {
      if (!value) return true;
      const current = new Date(value);
      if (Number.isNaN(current.getTime())) return true;

      const periodStart =
        analyticsPeriod === "week"
          ? new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
          : analyticsPeriod === "month"
            ? new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            : analyticsPeriod === "year"
              ? new Date(new Date().getFullYear(), 0, 1)
              : null;
      const start =
        periodStart ?? analyticsDateRange.start?.startOf("day").toDate();
      const end =
        analyticsPeriod === "custom"
          ? analyticsDateRange.end?.endOf("day").toDate()
          : new Date();
      if (start && current < start) return false;
      if (end && current > end) return false;
      return true;
    };
    const analyticsListings = latestListings.filter((listing) =>
      isWithinAnalyticsRange(listing.created_at),
    );
    const analyticsSiteVisits = siteVisits.filter((visit) =>
      isWithinAnalyticsRange(visit.created_at || visit.scheduled_date),
    );
    const listingMatchesStatusFilter = (listing: Listing) => {
      if (!analyticsStatusFilter) return true;
      if (analyticsStatusFilter === "sold") {
        return listing.status === "sold";
      }
      return listing.approval_status === analyticsStatusFilter;
    };
    const siteVisitMatchesStatusFilter = (visit: SiteVisit) => {
      if (!analyticsStatusFilter) return true;
      return visit.status.toLowerCase() === analyticsStatusFilter;
    };
    const filteredAnalyticsListings = analyticsListings.filter(
      listingMatchesStatusFilter,
    );
    const filteredAnalyticsSiteVisits = analyticsSiteVisits.filter(
      siteVisitMatchesStatusFilter,
    );
    const approvedListings = analyticsListings.filter(
      (listing) => listing.approval_status === "approved",
    ).length;
    const rejectedListings = analyticsListings.filter(
      (listing) => listing.approval_status === "rejected",
    ).length;
    const pendingListings = analyticsListings.filter(
      (listing) => listing.approval_status === "pending",
    ).length;
    const soldListings = analyticsListings.filter(
      (listing) => listing.status === "sold",
    ).length;
    const approvedSiteVisits = analyticsSiteVisits.filter(
      (visit) => visit.status.toLowerCase() === "approved",
    ).length;
    const pendingSiteVisits = analyticsSiteVisits.filter(
      (visit) => visit.status.toLowerCase() === "pending",
    ).length;
    const rejectedSiteVisits = analyticsSiteVisits.filter(
      (visit) => visit.status.toLowerCase() === "rejected",
    ).length;
    const soldSiteVisits = analyticsSiteVisits.filter(
      (visit) => visit.status.toLowerCase() === "sold",
    ).length;
    const approvedAgents = agents.filter((agent) =>
      ["approved", "active"].includes(agent.status),
    ).length;
    const pendingAgents = agents.filter(
      (agent) => agent.status === "pending",
    ).length;
    const rejectedAgents = agents.filter(
      (agent) => agent.status === "rejected",
    ).length;
    const totalSystemUsers = usersDirectory.length || (user ? 1 : 0);

    const analyticsMetrics: Array<{
      label: string;
      value: number;
      icon: ReactElement;
      color: "primary" | "secondary" | "warning" | "success" | "info";
      statusFilter?: "approved" | "pending" | "rejected" | "sold";
    }> =
      analyticsTab === "listings"
        ? [
            {
              label: "Total Listings",
              value: analyticsListings.length,
              icon: <FormatListNumberedIcon fontSize="small" />,
              color: "primary",
            },
            {
              label: "Approved",
              value: approvedListings,
              icon: <CheckCircleOutlineOutlinedIcon fontSize="small" />,
              color: "success",
              statusFilter: "approved",
            },
            {
              label: "Pending",
              value: pendingListings,
              icon: <AccessTimeOutlinedIcon fontSize="small" />,
              color: "warning",
              statusFilter: "pending",
            },
            {
              label: "Rejected",
              value: rejectedListings,
              icon: <CancelIcon fontSize="small" />,
              color: "secondary",
              statusFilter: "rejected",
            },
            {
              label: "Sold",
              value: soldListings,
              icon: <SellIcon fontSize="small" />,
              color: "info",
              statusFilter: "sold",
            },
            {
              label: "Total Views",
              value: analyticsListings.reduce(
                (sum, listing) => sum + listing.total_views,
                0,
              ),
              icon: <VisibilityOutlinedIcon fontSize="small" />,
              color: "primary",
            },
            {
              label: "Stars",
              value: analyticsListings.length * 5,
              icon: <StarIcon fontSize="small" />,
              color: "warning",
            },
          ]
        : analyticsTab === "agents"
          ? [
              {
                label: "Total Agents",
                value: agents.length,
                icon: <Groups2Icon fontSize="small" />,
                color: "primary",
              },
              {
                label: "Approved",
                value: approvedAgents,
                icon: <VerifiedIcon fontSize="small" />,
                color: "success",
              },
              {
                label: "Pending",
                value: pendingAgents,
                icon: <AccessTimeOutlinedIcon fontSize="small" />,
                color: "warning",
              },
              {
                label: "Rejected",
                value: rejectedAgents,
                icon: <CancelIcon fontSize="small" />,
                color: "secondary",
              },
              {
                label: "Agent Listings",
                value: latestListings.filter((listing) =>
                  agents.some((agent) => agent.id === listing.owner_id),
                ).length,
                icon: <HomeWorkIcon fontSize="small" />,
                color: "info",
              },
              {
                label: "Agent Views",
                value: latestListings.reduce(
                  (sum, listing) => sum + listing.total_views,
                  0,
                ),
                icon: <VisibilityOutlinedIcon fontSize="small" />,
                color: "primary",
              },
            ]
          : [
              {
                label: "Site Visitors",
                value: analyticsSiteVisits.length,
                icon: <PeopleAltIcon fontSize="small" />,
                color: "primary",
              },
              {
                label: "System Usage",
                value: totalSystemUsers,
                icon: <PersonIcon fontSize="small" />,
                color: "info",
              },
              {
                label: "Wishes",
                value: wishes.length,
                icon: <FavoriteIcon fontSize="small" />,
                color: "secondary",
              },
              {
                label: "Offers",
                value: offers.length,
                icon: <LocalOfferIcon fontSize="small" />,
                color: "warning",
              },
              {
                label: "Scheduled Visits",
                value: filteredAnalyticsSiteVisits.length,
                icon: <EventAvailableIcon fontSize="small" />,
                color: "success",
              },
              {
                label: "Approved",
                value: approvedSiteVisits,
                icon: <CheckCircleOutlineOutlinedIcon fontSize="small" />,
                color: "success",
                statusFilter: "approved",
              },
              {
                label: "Pending",
                value: pendingSiteVisits,
                icon: <AccessTimeOutlinedIcon fontSize="small" />,
                color: "warning",
                statusFilter: "pending",
              },
              {
                label: "Rejected",
                value: rejectedSiteVisits,
                icon: <CancelIcon fontSize="small" />,
                color: "secondary",
                statusFilter: "rejected",
              },
              {
                label: "Sold",
                value: soldSiteVisits,
                icon: <SellIcon fontSize="small" />,
                color: "info",
                statusFilter: "sold",
              },
            ];

    const listingAnalyticsRows = filteredAnalyticsListings.map((listing, index) => ({
      id: listing.id,
      no: index + 1,
      title: listing.title,
      status: getListingStatusLabel(listing),
      views: listing.total_views,
      offers: getListingOfferCount(listing.id),
      siteVisits: getListingSiteVisitCount(listing.id),
      sales: listing.total_sales ?? 0,
      stars: 5,
    }));
    const agentAnalyticsRows = agents.map((agent, index) => {
      const agentListings = latestListings.filter(
        (listing) => listing.owner_id === agent.id,
      );
      return {
        id: agent.id,
        no: index + 1,
        name: getUserDisplayName(agent),
        status: formatStatusLabel(agent.status),
        listings: agentListings.length,
        views: agentListings.reduce(
          (sum, listing) => sum + listing.total_views,
          0,
        ),
        sales: agent.sales_closed ?? 0,
      };
    });
    const siteAnalyticsRows = [
      {
        id: 1,
        no: 1,
        metric: "Site visitors",
        value: filteredAnalyticsSiteVisits.length,
      },
      { id: 2, no: 2, metric: "System usage", value: totalSystemUsers },
      { id: 3, no: 3, metric: "Wishes", value: wishes.length },
      { id: 4, no: 4, metric: "Offers", value: offers.length },
    ];

    const listingColumns: GridColDef[] = [
      { field: "no", headerName: "No", width: 80 },
      { field: "title", headerName: "Listing", flex: 1, minWidth: 220 },
      { field: "status", headerName: "Status", width: 140 },
      { field: "views", headerName: "Views", type: "number", width: 110 },
      { field: "offers", headerName: "Offers", type: "number", width: 110 },
      {
        field: "siteVisits",
        headerName: "Site Visits",
        type: "number",
        width: 130,
      },
      { field: "sales", headerName: "Sales", type: "number", width: 110 },
    ];
    const agentColumns: GridColDef[] = [
      { field: "no", headerName: "No", width: 80 },
      { field: "name", headerName: "Agent", flex: 1, minWidth: 220 },
      { field: "status", headerName: "Status", width: 140 },
      { field: "listings", headerName: "Listings", type: "number", width: 120 },
      { field: "views", headerName: "Views", type: "number", width: 110 },
      { field: "sales", headerName: "Sales", type: "number", width: 110 },
    ];
    const siteColumns: GridColDef[] = [
      { field: "no", headerName: "No", width: 80 },
      { field: "metric", headerName: "Metric", flex: 1, minWidth: 220 },
      { field: "value", headerName: "Value", type: "number", width: 140 },
    ];

    return (
      <Paper className="priority-card dashboard-data-grid-card">
        <div className="analytics-tabs-row">
          <Tabs
            value={analyticsTab}
            onChange={(_, value: "listings" | "agents" | "site") =>
              setAnalyticsTab(value)
            }
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value="listings" label="Listings" />
            <Tab value="agents" label="Agents" />
            <Tab value="site" label="Site" />
          </Tabs>
          <div className="analytics-date-range">
            <RadioGroup
              row
              value={analyticsPeriod}
              onChange={(event) =>
                setAnalyticsPeriod(
                  event.target.value as "custom" | "week" | "month" | "year",
                )
              }
              className="analytics-period-radio"
            >
              <FormControlLabel value="week" control={<Radio size="small" />} label="This week" />
              <FormControlLabel value="month" control={<Radio size="small" />} label="This month" />
              <FormControlLabel value="year" control={<Radio size="small" />} label="This year" />
            </RadioGroup>
            <CalendarMonthIcon fontSize="small" />
            <DatePicker
              label="From"
              value={analyticsDateRange.start}
              onChange={(value) =>
                {
                  setAnalyticsPeriod("custom");
                  setAnalyticsDateRange((current) => ({
                    ...current,
                    start: value,
                  }));
                }
              }
              disableFuture
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="To"
              value={analyticsDateRange.end}
              onChange={(value) =>
                {
                  setAnalyticsPeriod("custom");
                  setAnalyticsDateRange((current) => ({
                    ...current,
                    end: value,
                  }));
                }
              }
              disableFuture
              slotProps={{ textField: { size: "small" } }}
            />
          </div>
        </div>
        <div className="analytics-chip-row">
          {analyticsMetrics.map((metric) => (
            <Chip
              key={metric.label}
              className={`analytics-metric-chip analytics-metric-chip-${metric.color}`}
              size="small"
              icon={metric.icon}
              label={`${metric.label}: ${metric.value}`}
              onClick={
                metric.statusFilter && analyticsTab !== "agents"
                  ? () => toggleAnalyticsStatusFilter(metric.statusFilter!)
                  : undefined
              }
              variant={
                metric.statusFilter === analyticsStatusFilter
                  ? "filled"
                  : "outlined"
              }
            />
          ))}
        </div>
        {analyticsTab === "listings" ? (
          <Box className="analytics-chart-shell">
            <BarChart
              height={260}
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Views", "Offers", "Site Visits", "Sales"],
                },
              ]}
              series={[
                {
                  data: [
                    filteredAnalyticsListings.reduce(
                      (sum, listing) => sum + listing.total_views,
                      0,
                    ),
                    filteredAnalyticsListings.reduce(
                      (sum, listing) => sum + getListingOfferCount(listing.id),
                      0,
                    ),
                    filteredAnalyticsListings.reduce(
                      (sum, listing) => sum + getListingSiteVisitCount(listing.id),
                      0,
                    ),
                    filteredAnalyticsListings.reduce(
                      (sum, listing) => sum + (listing.total_sales ?? 0),
                      0,
                    ),
                  ],
                },
              ]}
            />
          </Box>
        ) : analyticsTab === "site" ? (
          <Box className="analytics-chart-shell">
            <BarChart
              height={260}
              xAxis={[
                {
                  scaleType: "band",
                  data: ["System Usage", "Site Visits", "Offers", "Wishes"],
                },
              ]}
              series={[
                {
                  data: [
                    totalSystemUsers,
                    filteredAnalyticsSiteVisits.length,
                    offers.length,
                    wishes.length,
                  ],
                },
              ]}
            />
          </Box>
        ) : null}
        <Box className="dashboard-grid-shell">
          <DataGrid
            rows={
              analyticsTab === "listings"
                ? listingAnalyticsRows
                : analyticsTab === "agents"
                  ? agentAnalyticsRows
                  : siteAnalyticsRows
            }
            columns={
              analyticsTab === "listings"
                ? listingColumns
                : analyticsTab === "agents"
                  ? agentColumns
                  : siteColumns
            }
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            slots={{ toolbar: DashboardGridToolbar }}
          />
        </Box>
      </Paper>
    );
  }

  function renderAuditLogsGrid() {
    const rows = auditLogs.map((log, index) => ({
      ...log,
      no: index + 1,
      created_at_display: new Date(log.created_at).toLocaleString(),
    }));
    const columns: GridColDef[] = [
      { field: "no", headerName: "No", width: 80 },
      { field: "action", headerName: "Action", minWidth: 180, flex: 0.8 },
      { field: "entity_type", headerName: "Entity", width: 140 },
      { field: "description", headerName: "Description", minWidth: 260, flex: 1 },
      { field: "created_at_display", headerName: "Created", width: 210 },
    ];

    return (
      <Paper className="priority-card dashboard-data-grid-card">
        <Box className="dashboard-grid-shell">
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            slots={{ toolbar: DashboardGridToolbar }}
          />
        </Box>
      </Paper>
    );
  }

  function renderUsersGrid() {
    const rows = usersDirectory
      .filter((account) => ["super_admin", "admin"].includes(account.role))
      .map((account, index) => ({
        ...account,
        no: index + 1,
        name: getUserDisplayName(account),
        role_label: formatStatusLabel(account.role),
        status_label: formatStatusLabel(account.status),
        created_at_display: account.created_at
          ? new Date(account.created_at).toLocaleString()
          : "",
      }));
    const columns: GridColDef[] = [
      { field: "no", headerName: "No", width: 80 },
      { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
      { field: "email", headerName: "Email", minWidth: 240, flex: 1 },
      { field: "role_label", headerName: "Role", width: 150 },
      { field: "status_label", headerName: "Status", width: 140 },
      { field: "phone_number", headerName: "Mobile", width: 160 },
      { field: "created_at_display", headerName: "Created", width: 210 },
    ];

    return (
      <Paper className="priority-card dashboard-data-grid-card">
        <div className="dashboard-listings-tabs-row">
          <div>
            <Typography variant="h5">Users</Typography>
            <Typography color="text.secondary">
              Super Admins and Admins in the system.
            </Typography>
          </div>
          {user?.role === "super_admin" ? (
            <Button
              variant="contained"
              startIcon={<PeopleAltIcon />}
              onClick={() => setUserDrawerOpen(true)}
            >
              Add user
            </Button>
          ) : null}
        </div>
        <Box className="dashboard-grid-shell">
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            slots={{ toolbar: DashboardGridToolbar }}
          />
        </Box>
      </Paper>
    );
  }

  function renderDashboardPanel() {
    if (!user) return null;

    if (user.role === "agent") {
      const agentListings = latestListings.filter(
        (listing) => listing.owner_id === user.id,
      );

      return listingsLoading ? (
        <ListingCardLoader count={3} className="listing-grid" />
      ) : (
        <div className="agent-dashboard-stack">
          <AgentProfilePanel
            user={user}
            listings={agentListings}
            wishes={wishes}
            onCreateListing={() => setListingDrawerOpen(true)}
          />
          <Card
            className="priority-card dashboard-listings-panel"
            elevation={2}
          >
            <div className="agent-section-header">
              <div>
                <Typography variant="h5">My Listings</Typography>
                <Typography color="text.secondary">
                  Listings you have created appear here as cards.
                </Typography>
              </div>
              <Button
                variant="contained"
                startIcon={<HomeWorkIcon />}
                onClick={() => setListingDrawerOpen(true)}
              >
                Create listing
              </Button>
            </div>
            {agentListings.length ? (
              <div className="listing-grid">
                {agentListings.map((listing) => (
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
                    onOpenArticle={openArticlePage}
                  />
                ))}
              </div>
            ) : (
              <Box className="dashboard-empty-state">
                <Typography variant="h6">No listings posted yet.</Typography>
                <Typography color="text.secondary">
                  Create your first listing to start building your portfolio.
                </Typography>
              </Box>
            )}
          </Card>
        </div>
      );
    }

    if (selectedMenu === "Listings") {
      return listingsLoading ? (
        <ListingCardLoader count={3} className="listing-grid" />
      ) : (
        <Paper className="priority-card dashboard-listings-panel">
          <div className="dashboard-listings-tabs-row">
            <Tabs
              value={listingsTab}
              onChange={(_, value: "all" | "featured" | "for-you") =>
                setListingsTab(value)
              }
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value="all" label="All" />
              <Tab value="featured" label="Featured" />
              <Tab value="for-you" label="By You" />
            </Tabs>
            <Button
              variant="contained"
              startIcon={<HomeWorkIcon />}
              onClick={openListingDrawer}
            >
              Create listing
            </Button>
          </div>
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
                  onOpenArticle={openArticlePage}
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
          {filteredDashboardListings.length >
          visibleDashboardListings.length ? (
            <Box
              ref={listingsLoadMoreRef}
              className="dashboard-load-more-trigger"
            >
              <CircularProgress size={24} color="warning" />
            </Box>
          ) : null}
        </Paper>
      );
    }

    if (selectedMenu === "Agents") {
      return (
        <Paper className="priority-card dashboard-card-panel">
          {visibleAgents.length ? (
            <div className="agent-grid">
              {visibleAgents.map((agent) => (
                <Card key={agent.id} className="agent-card" elevation={2}>
                  {!["approved", "active"].includes(agent.status) ? (
                    <div className="listing-sold-ribbon">
                      {formatStatusLabel(agent.status)}
                    </div>
                  ) : null}
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
            <Box
              ref={agentsLoadMoreRef}
              className="dashboard-load-more-trigger"
            >
              <CircularProgress size={24} color="warning" />
            </Box>
          ) : null}
        </Paper>
      );
    }

    if (selectedMenu === "Wishes") {
      return (
        <Paper className="priority-card dashboard-card-panel">
          <div className="listing-grid">
            {wishes.map((wish) => (
              <Card key={wish.id} className="dashboard-record-card" elevation={2}>
              <div className="dashboard-record-thumbnail dashboard-record-thumbnail-wish">
                <div className="listing-sold-ribbon">
                  {formatStatusLabel(wish.status)}
                </div>
                <FavoriteIcon />
              </div>
              <CardContent className="dashboard-record-content">
                <div className="dashboard-record-title-row">
                  <Typography variant="h6">{wish.title}</Typography>
                  <IconButton
                    size="small"
                    aria-label={`Open actions for ${wish.title}`}
                    onClick={(event) =>
                      openRecordActionMenu(event, { kind: "wish", record: wish })
                    }
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {wish.description}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {wish.customer_name} | {wish.customer_email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {[wish.village, wish.district].filter(Boolean).join(", ") ||
                    "Location not added"}
                </Typography>
                <div className="dashboard-record-chip-row">
                  <Chip size="small" label={wish.purpose || "Any purpose"} />
                  <Chip
                    size="small"
                    variant="outlined"
                    label={wish.price_range || "Any budget"}
                  />
                  <Chip
                    size="small"
                    icon={<SpeakerNotesIcon fontSize="small" />}
                    label={`${getOperationalNoteCount("wish", wish.id)} notes`}
                  />
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        </Paper>
      );
    }

    if (selectedMenu === "Site Visits") {
      return (
        <Paper className="priority-card dashboard-card-panel">
          <div className="listing-grid">
            {siteVisits.map((visit) => (
              <Card
                key={visit.id}
                className="dashboard-record-card"
                elevation={2}
              >
              <div className="dashboard-record-thumbnail dashboard-record-thumbnail-visit">
                <div className="listing-sold-ribbon">
                  {formatStatusLabel(visit.status)}
                </div>
                <EventAvailableIcon />
              </div>
              <CardContent className="dashboard-record-content">
                <div className="dashboard-record-title-row">
                  <Typography variant="h6">
                    {getListingTitle(visit.listing_id)}
                  </Typography>
                  <IconButton
                    size="small"
                    aria-label={`Open actions for ${getListingTitle(visit.listing_id)}`}
                    onClick={(event) =>
                      openRecordActionMenu(event, {
                        kind: "siteVisit",
                        record: visit,
                      })
                    }
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {visit.customer_name} | {visit.customer_email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {visit.customer_mobile_number}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {visit.scheduled_date} at {visit.scheduled_time}
                </Typography>
                {visit.message ? (
                  <Typography variant="body2" color="text.secondary">
                    {visit.message}
                  </Typography>
                ) : null}
                <div className="dashboard-record-chip-row">
                  <Chip
                    size="small"
                    icon={<SpeakerNotesIcon fontSize="small" />}
                    label={`${getOperationalNoteCount("siteVisit", visit.id)} notes`}
                  />
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        </Paper>
      );
    }

    if (selectedMenu === "Offers") {
      return (
        <Paper className="priority-card dashboard-card-panel">
          <div className="listing-grid">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                className="dashboard-record-card"
                elevation={2}
              >
              <div className="dashboard-record-thumbnail dashboard-record-thumbnail-offer">
                <div className="listing-sold-ribbon">
                  {formatStatusLabel(offer.status)}
                </div>
                <LocalOfferIcon />
              </div>
              <CardContent className="dashboard-record-content">
                <div className="dashboard-record-title-row">
                  <Typography variant="h6">
                    {formatPrice(offer.amount)}
                  </Typography>
                  <IconButton
                    size="small"
                    aria-label={`Open actions for offer ${offer.id}`}
                    onClick={(event) =>
                      openRecordActionMenu(event, {
                        kind: "offer",
                        record: offer,
                      })
                    }
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {getListingTitle(offer.listing_id)}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {offer.full_name} | {offer.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer.mobile_number}
                </Typography>
                <div className="dashboard-record-chip-row">
                  <Chip
                    size="small"
                    icon={<SpeakerNotesIcon fontSize="small" />}
                    label={`${getOperationalNoteCount("offer", offer.id)} notes`}
                  />
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        </Paper>
      );
    }

    if (selectedMenu === "Analytics") {
      return renderAnalyticsPanel();
    }

    if (selectedMenu === "Reports") {
      return <Box className="blank-dashboard-page" />;
    }

    if (selectedMenu === "Audit logs") {
      return renderAuditLogsGrid();
    }

    if (selectedMenu === "Users") {
      return renderUsersGrid();
    }

    return null;
  }

  async function handleWishSubmit(event: FormEvent) {
    event.preventDefault();
    setFormSubmitting("wish", true);
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
      showFormAlert("success", "Wish submited successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to submit your wish right now."),
      );
    } finally {
      setFormSubmitting("wish", false);
    }
  }

  async function handleSiteVisitSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedListing) return;
    setFormSubmitting("site-visit", true);
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
      showFormAlert("success", "Site visit request submitted successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(
          error,
          "Unable to submit your site visit request right now.",
        ),
      );
    } finally {
      setFormSubmitting("site-visit", false);
    }
  }

  function openProgressDialog() {
    if (!selectedOperationalRecord) return;
    setRecordStatusForm(selectedOperationalRecord.record.status);
    closeRecordActionMenu();
    setProgressDialogOpen(true);
  }

  function openNoteDialog() {
    if (!selectedOperationalRecord) return;
    closeRecordActionMenu();
    setNoteDialogOpen(true);
  }

  async function handleOperationalStatusSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || !selectedOperationalRecord) return;

    const { kind, record } = selectedOperationalRecord;
    const endpoint =
      kind === "wish"
        ? `/wishes/${record.id}/status`
        : kind === "siteVisit"
          ? `/site-visits/${record.id}/status`
          : `/offers/${record.id}/status`;

    setFormSubmitting("record-progress", true);
    try {
      await api.patch(endpoint, { status: recordStatusForm });
      await loadDashboard(user);
      closeOperationalDialogs();
      showFormAlert("success", "Progress updated successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to update progress right now."),
      );
    } finally {
      setFormSubmitting("record-progress", false);
    }
  }

  async function handleOperationalNoteSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || !selectedOperationalRecord) return;

    const payload: {
      content: string;
      user_id: number;
      wish_id?: number;
      site_visit_id?: number;
      offer_id?: number;
    } = {
      content: noteForm,
      user_id: user.id,
    };

    if (selectedOperationalRecord.kind === "wish") {
      payload.wish_id = selectedOperationalRecord.record.id;
    }
    if (selectedOperationalRecord.kind === "siteVisit") {
      payload.site_visit_id = selectedOperationalRecord.record.id;
    }
    if (selectedOperationalRecord.kind === "offer") {
      payload.offer_id = selectedOperationalRecord.record.id;
    }

    setFormSubmitting("record-note", true);
    try {
      await api.post("/notes", payload);
      await loadDashboard(user);
      closeOperationalDialogs();
      showFormAlert("success", "Note added successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to add this note right now."),
      );
    } finally {
      setFormSubmitting("record-note", false);
    }
  }

  async function handleForwardWishSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || selectedOperationalRecord?.kind !== "wish") return;

    const wish = selectedOperationalRecord.record;
    const approvedAgents = agents.filter((agent) =>
      ["approved", "active"].includes(agent.status),
    );
    const selectedAgents =
      forwardWishMode === "district"
        ? approvedAgents.filter((agent) => agent.district === wish.district)
        : forwardWishMode === "village"
          ? approvedAgents.filter(
              (agent) =>
                agent.district === wish.district &&
                agent.village === wish.village,
            )
          : forwardWishAgents;

    setFormSubmitting("wish-forward", true);
    try {
      await api.patch(`/wishes/${wish.id}/status`, { status: "forwarded" });
      await api.post("/notes", {
        wish_id: wish.id,
        user_id: user.id,
        content: `Forwarded wish to ${selectedAgents.length} agent(s): ${
          selectedAgents.map((agent) => getUserDisplayName(agent)).join(", ") ||
          "No matching agents"
        }`,
      });
      await loadDashboard(user);
      closeOperationalDialogs();
      showFormAlert("success", "Wish forwarded successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to forward this wish right now."),
      );
    } finally {
      setFormSubmitting("wish-forward", false);
    }
  }

  async function handleOfferSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedListing) return;
    setFormSubmitting("offer", true);
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
      showFormAlert("success", "Offer submitted successfully.");
    } catch (error) {
      showFormAlert(
        "error",
        getApiErrorMessage(error, "Unable to submit your offer right now."),
      );
    } finally {
      setFormSubmitting("offer", false);
    }
  }

  function renderEditListingDialog() {
    return (
      <Dialog
        open={editListingOpen}
        onClose={closeEditListingDialog}
        fullWidth
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleListingEditSubmit}>
          <DialogTitle>Edit listing</DialogTitle>
          <DialogContent dividers>
            <div className="drawer-form drawer-form-compact">
              <TextField
                className="drawer-form-full"
                label="Listing title"
                value={editListingForm.title}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    title: event.target.value,
                  })
                }
                required
              />
              <TextField
                className="drawer-form-full"
                label="Description"
                value={editListingForm.description}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    description: event.target.value,
                  })
                }
                multiline
                minRows={3}
                required
              />
              <TextField
                label="District"
                value={editListingForm.district}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    district: event.target.value,
                  })
                }
                required
              />
              <TextField
                label="City"
                value={editListingForm.city}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    city: event.target.value,
                  })
                }
              />
              <TextField
                label="Address"
                value={editListingForm.address}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    address: event.target.value,
                  })
                }
              />
              <TextField
                label="Category"
                value={editListingForm.category}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    category: event.target.value,
                  })
                }
              />
              <TextField
                label="Purpose"
                value={editListingForm.purpose}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    purpose: event.target.value,
                  })
                }
              />
              <TextField
                label="Size"
                value={editListingForm.size_text}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    size_text: event.target.value,
                  })
                }
              />
              <TextField
                label="Price"
                value={editListingForm.price}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    price: event.target.value,
                  })
                }
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">UGX</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Title transfer charges"
                value={editListingForm.title_transfer_charges}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    title_transfer_charges: event.target.value,
                  })
                }
              />
              <TextField
                label="Latitude"
                value={editListingForm.latitude}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    latitude: event.target.value,
                  })
                }
              />
              <TextField
                label="Longitude"
                value={editListingForm.longitude}
                onChange={(event) =>
                  setEditListingForm({
                    ...editListingForm,
                    longitude: event.target.value,
                  })
                }
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditListingDialog}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting("listing-edit")}
              startIcon={getSubmitProgress("listing-edit")}
            >
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }

  function renderListingPicturesDialog() {
    return (
      <Dialog
        open={picturesDialogOpen}
        onClose={closePicturesDialog}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleListingPicturesSubmit}>
          <DialogTitle>Add listing pictures</DialogTitle>
          <DialogContent dividers>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Add one main display picture and four article gallery pictures.
            </Typography>
            <div className="picture-picker-grid">
              {listingPicturePreviews.map((value, index) => (
                <Box
                  key={index}
                  component="label"
                  className="picture-picker"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handlePicturePick(
                      index,
                      event.dataTransfer.files[0] ?? null,
                    );
                  }}
                >
                  {value ? (
                    <img
                      src={resolveImage(value)}
                      alt={`Listing upload ${index + 1}`}
                    />
                  ) : (
                    <div className="picture-picker-empty">
                      <PhotoLibraryIcon />
                      <Typography variant="body2">
                        {index === 0
                          ? "Main display picture"
                          : `Article picture ${index}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Drag image here or click to pick
                      </Typography>
                    </div>
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(event) =>
                      handlePicturePick(index, event.target.files?.[0] ?? null)
                    }
                  />
                </Box>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closePicturesDialog}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting("listing-pictures")}
              startIcon={getSubmitProgress("listing-pictures")}
            >
              Save pictures
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }

  function renderListingFeaturesDialog() {
    return (
      <Dialog
        open={featuresDialogOpen}
        onClose={closeFeaturesDialog}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleFeatureSubmit}>
          <DialogTitle>Add listing feature</DialogTitle>
          <DialogContent dividers>
            <div className="drawer-form">
              <TextField
                select
                label="Feature category"
                value={featureForm.category}
                onChange={(event) =>
                  setFeatureForm({
                    ...featureForm,
                    category: event.target.value,
                  })
                }
                required
              >
                {LISTING_FEATURE_CATEGORIES.map((category) => (
                  <MenuItem key={category.label} value={category.label}>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Feature"
                value={featureForm.title}
                onChange={(event) =>
                  setFeatureForm({
                    ...featureForm,
                    title: event.target.value,
                  })
                }
                placeholder="e.g. Power available, Freehold title"
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFeaturesDialog}>Close</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting("listing-feature")}
              startIcon={getSubmitProgress("listing-feature")}
            >
              Save feature
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
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
                  setDrawerMode("profile");
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
                  key={item}
                  type="button"
                  className={`mini-item${selectedMenu === item ? " mini-item-selected" : ""}`}
                  onClick={() => setSelectedMenu(item)}
                >
                  <span className="mini-item-icon">
                    {dashboardMenuIcons[item]}
                  </span>
                  {sidebarOpen ? (
                    <span className="mini-item-label">
                      {item}
                      {getDashboardMenuBadgeCount(item) > 0 ? (
                        <Badge
                          badgeContent={getDashboardMenuBadgeCount(item)}
                          color="warning"
                          className="mini-item-inline-badge"
                        />
                      ) : null}
                    </span>
                  ) : getDashboardMenuBadgeCount(item) > 0 ? (
                    <Badge
                      badgeContent={getDashboardMenuBadgeCount(item)}
                      color="warning"
                      className="mini-item-inline-badge"
                    />
                  ) : null}
                </button>
              ))}
              {sidebarOpen ? (
                <div className="mini-user-card">
                  <Typography variant="caption" color="text.secondary">
                    Signed in
                  </Typography>
                  <Typography variant="subtitle2">
                    {getUserDisplayName(user)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Chip
                    size="small"
                    label={formatStatusLabel(user.role)}
                    color="primary"
                    variant="outlined"
                  />
                </div>
              ) : (
                <div className="mini-user-card-collapsed">
                  <PersonIcon fontSize="small" />
                </div>
              )}
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
                      {user.role === "agent" ? "My Profile" : selectedMenu}
                    </Typography>
                    {selectedMenu === "Listings" ? (
                      <TextField
                        size="small"
                        label="Search listings"
                        value={listingSearch}
                        onChange={(event) =>
                          setListingSearch(event.target.value)
                        }
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

                <div className="dashboard-content">
                  {renderDashboardPanel()}
                </div>
              </>
            )}
          </main>
        </Box>
        <Menu
          anchorEl={recordActionAnchor}
          open={Boolean(recordActionAnchor)}
          onClose={closeRecordActionMenu}
        >
          <MenuItem onClick={openProgressDialog}>Change Progress</MenuItem>
          <MenuItem onClick={openNoteDialog}>Add Note</MenuItem>
          {selectedOperationalRecord?.kind === "wish" ? (
            <MenuItem onClick={openForwardWishDialog}>
              Forward
            </MenuItem>
          ) : null}
        </Menu>
        <Dialog
          open={forwardWishDialogOpen}
          onClose={closeOperationalDialogs}
          fullWidth
          maxWidth="sm"
        >
          <Box component="form" onSubmit={handleForwardWishSubmit}>
            <DialogTitle>Forward Wish</DialogTitle>
            <DialogContent>
              {selectedOperationalRecord?.kind === "wish" ? (
                <div className="drawer-form drawer-form-single-column">
                  <RadioGroup
                    value={forwardWishMode}
                    onChange={(event) => {
                      setForwardWishMode(
                        event.target.value as
                          | "district"
                          | "village"
                          | "individual",
                      );
                      setForwardWishAgents([]);
                    }}
                  >
                    <FormControlLabel
                      value="district"
                      control={<Radio />}
                      label={`All agents in ${selectedOperationalRecord.record.district || "selected district"}`}
                    />
                    <FormControlLabel
                      value="village"
                      control={<Radio />}
                      label={`All agents in ${selectedOperationalRecord.record.village || "selected city/village"}`}
                    />
                    <FormControlLabel
                      value="individual"
                      control={<Radio />}
                      label="Select individual agents"
                    />
                  </RadioGroup>
                  {forwardWishMode === "individual" ? (
                    <Autocomplete
                      multiple
                      options={agents.filter((agent) =>
                        ["approved", "active"].includes(agent.status),
                      )}
                      value={forwardWishAgents}
                      onChange={(_, value) => setForwardWishAgents(value)}
                      getOptionLabel={(agent) => getUserDisplayName(agent)}
                      renderInput={(params) => (
                        <TextField {...params} label="Agents" />
                      )}
                    />
                  ) : null}
                  <Box className="forward-selection-box">
                    {(
                      forwardWishMode === "district"
                        ? agents.filter(
                            (agent) =>
                              ["approved", "active"].includes(agent.status) &&
                              agent.district ===
                                selectedOperationalRecord.record.district,
                          )
                        : forwardWishMode === "village"
                          ? agents.filter(
                              (agent) =>
                                ["approved", "active"].includes(agent.status) &&
                                agent.district ===
                                  selectedOperationalRecord.record.district &&
                                agent.village ===
                                  selectedOperationalRecord.record.village,
                            )
                          : forwardWishAgents
                    ).map((agent) => (
                      <Chip
                        key={agent.id}
                        label={getUserDisplayName(agent)}
                        onDelete={
                          forwardWishMode === "individual"
                            ? () =>
                                setForwardWishAgents((current) =>
                                  current.filter((item) => item.id !== agent.id),
                                )
                            : undefined
                        }
                      />
                    ))}
                  </Box>
                </div>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeOperationalDialogs}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting("wish-forward")}
                startIcon={getSubmitProgress("wish-forward")}
              >
                Forward
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Dialog
          open={progressDialogOpen}
          onClose={closeOperationalDialogs}
          fullWidth
          maxWidth="xs"
        >
          <Box component="form" onSubmit={handleOperationalStatusSubmit}>
            <DialogTitle>Change Progress</DialogTitle>
            <DialogContent>
              <TextField
                select
                fullWidth
                label="Status"
                value={recordStatusForm}
                onChange={(event) => setRecordStatusForm(event.target.value)}
                sx={{ mt: 1 }}
              >
                {[
                  "pending",
                  "in progress",
                  "forwarded",
                  "approved",
                  "rejected",
                  "completed",
                ].map((status) => (
                  <MenuItem key={status} value={status}>
                    {formatStatusLabel(status)}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeOperationalDialogs}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting("record-progress")}
                startIcon={getSubmitProgress("record-progress")}
              >
                Save
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Dialog
          open={noteDialogOpen}
          onClose={closeOperationalDialogs}
          fullWidth
          maxWidth="sm"
        >
          <Box component="form" onSubmit={handleOperationalNoteSubmit}>
            <DialogTitle>Add Note</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Note"
                value={noteForm}
                onChange={(event) => setNoteForm(event.target.value)}
                required
                sx={{ mt: 1 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeOperationalDialogs}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting("record-note")}
                startIcon={getSubmitProgress("record-note")}
              >
                Add note
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Drawer anchor="right" open={userDrawerOpen} onClose={closeUserDrawer}>
          <Box sx={{ width: { xs: 360, sm: 440 }, p: 3 }}>
            <Box component="form" onSubmit={handleAdminUserSubmit}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Add User
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Create a Super Admin or Admin account.
              </Typography>
              <div className="drawer-form drawer-form-compact">
                <TextField
                  className="drawer-form-full"
                  label="Username"
                  value={adminUserForm.username}
                  onChange={(event) =>
                    setAdminUserForm({
                      ...adminUserForm,
                      username: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  label="First name"
                  value={adminUserForm.first_name}
                  onChange={(event) =>
                    setAdminUserForm({
                      ...adminUserForm,
                      first_name: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  label="Last name"
                  value={adminUserForm.last_name}
                  onChange={(event) =>
                    setAdminUserForm({
                      ...adminUserForm,
                      last_name: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  className="drawer-form-full"
                  label="Email"
                  type="email"
                  value={adminUserForm.email}
                  onChange={(event) =>
                    setAdminUserForm({
                      ...adminUserForm,
                      email: event.target.value,
                    })
                  }
                  required
                />
                <TextField
                  label="Mobile number"
                  value={adminUserForm.phone_number}
                  onChange={(event) =>
                    setAdminUserForm({
                      ...adminUserForm,
                      phone_number: event.target.value,
                    })
                  }
                />
                <TextField
                  select
                  label="Role"
                  value={adminUserForm.role}
                  onChange={(event) =>
                    setAdminUserForm({
                      ...adminUserForm,
                      role: event.target.value as "admin" | "super_admin",
                    })
                  }
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="super_admin">Super Admin</MenuItem>
                </TextField>
                <TextField
                  className="drawer-form-full"
                  label="Password"
                  type="password"
                  value={adminUserForm.password}
                  onChange={(event) =>
                    setAdminUserForm({
                      ...adminUserForm,
                      password: event.target.value,
                    })
                  }
                  required
                  helperText="Use at least 8 characters."
                />
                <Box className="drawer-actions">
                  <Button variant="outlined" size="large" onClick={closeUserDrawer}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting("admin-user-create")}
                    startIcon={getSubmitProgress("admin-user-create")}
                  >
                    Add user
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
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting("site-visit")}
                    startIcon={getSubmitProgress("site-visit")}
                  >
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
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting("offer")}
                    startIcon={getSubmitProgress("offer")}
                  >
                    Submit offer
                  </Button>
                </Box>
              </div>
            </Box>
          </Box>
        </Drawer>
        <Drawer
          anchor="right"
          open={listingDrawerOpen}
          onClose={() => setListingDrawerOpen(false)}
        >
          <Box sx={{ width: { xs: 360, sm: 520 }, p: 3 }}>
            {renderListingFormContent()}
          </Box>
        </Drawer>
        <Drawer
          anchor="right"
          open={drawerMode === "profile"}
          onClose={() => setDrawerMode(null)}
        >
          <Box sx={{ width: { xs: 360, sm: 520 }, p: 3 }}>
            {renderProfileFormContent()}
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
          {user?.role === "super_admin" ? (
            <MenuItem onClick={() => void handleAgentAction("delete")}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          ) : null}
        </Menu>
        <Menu
          anchorEl={listingActionAnchor}
          open={Boolean(listingActionAnchor)}
          onClose={handleListingActionClose}
          slotProps={{ paper: { sx: { width: 270 } } }}
        >
          {user?.role === "agent"
            ? [
                <MenuItem key="edit" onClick={openEditListingDialog}>
                  <EditIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit
                </MenuItem>,
                <MenuItem key="pictures" onClick={openPicturesDialog}>
                  <PhotoLibraryIcon fontSize="small" sx={{ mr: 1 }} />
                  Add Pictures
                </MenuItem>,
                <MenuItem key="features" onClick={openFeaturesDialog}>
                  <AutoAwesomeOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  Add Features
                </MenuItem>,
                <MenuItem
                  key="delete"
                  onClick={() => void handleListingDelete()}
                >
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete
                </MenuItem>,
              ]
            : [
                <MenuItem
                  key="approve"
                  onClick={() => void handleListingAdminAction("approve")}
                >
                  <CheckCircleOutlineOutlinedIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  Approve
                </MenuItem>,
                getListingAuthorCanManageContent(selectedListing) ? (
                  <MenuItem key="edit" onClick={openEditListingDialog}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit
                  </MenuItem>
                ) : null,
                getListingAuthorCanManageContent(selectedListing) ? (
                  <MenuItem key="pictures" onClick={openPicturesDialog}>
                    <PhotoLibraryIcon fontSize="small" sx={{ mr: 1 }} />
                    Add Pictures
                  </MenuItem>
                ) : null,
                getListingAuthorCanManageContent(selectedListing) ? (
                  <MenuItem key="features" onClick={openFeaturesDialog}>
                    <AutoAwesomeOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                    Add Features
                  </MenuItem>
                ) : null,
                <MenuItem
                  key="featured"
                  onClick={() => void handleListingAdminAction("feature")}
                >
                  <StarIcon fontSize="small" sx={{ mr: 1 }} />
                  Featured
                </MenuItem>,
                <MenuItem
                  key="reject"
                  onClick={() => void handleListingAdminAction("reject")}
                >
                  <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                  Reject
                </MenuItem>,
                <MenuItem
                  key="deactivate"
                  onClick={() => void handleListingAdminAction("deactivate")}
                >
                  <BlockIcon fontSize="small" sx={{ mr: 1 }} />
                  Deactivate
                </MenuItem>,
                <MenuItem
                  key="sold"
                  onClick={openSaleDialog}
                >
                  <SellIcon fontSize="small" sx={{ mr: 1 }} />
                  Sold Off
                </MenuItem>,
                selectedListing?.owner_id === user?.id ||
                user?.role === "super_admin" ? (
                  <MenuItem
                    key="delete"
                    onClick={() => void handleListingAdminAction("delete")}
                  >
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                  </MenuItem>
                ) : null,
              ]}
        </Menu>
        {renderEditListingDialog()}
        {renderListingPicturesDialog()}
        {renderListingFeaturesDialog()}
        <Dialog open={saleDialogOpen} onClose={closeSaleDialog} fullWidth maxWidth="xs">
          <Box component="form" onSubmit={handleListingSaleSubmit}>
            <DialogTitle>Register Listing Sale</DialogTitle>
            <DialogContent>
              <div className="drawer-form drawer-form-single-column">
                <TextField
                  label="Sale price"
                  value={saleForm.sale_price}
                  onChange={(event) =>
                    setSaleForm({ ...saleForm, sale_price: event.target.value })
                  }
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">UGX</InputAdornment>
                      ),
                    },
                  }}
                />
                <DatePicker
                  label="Sale date"
                  value={saleForm.sold_at}
                  onChange={(value) => setSaleForm({ ...saleForm, sold_at: value })}
                  disableFuture
                  slotProps={{ textField: { required: true } }}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeSaleDialog}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting("listing-sale")}
                startIcon={getSubmitProgress("listing-sale")}
              >
                Register sale
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
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
                onOpenArticle={openArticlePage}
                onRegisterView={registerListingView}
              />
            }
          />
          <Route
            path="/listings/:listingId"
            element={
              <ListingArticlePage
                listings={[...featuredListings, ...latestListings]}
                onOpenSiteVisit={openSiteVisitDrawer}
                onOpenOffer={openOfferDrawer}
                onOpenArticle={openArticlePage}
                onRegisterView={registerListingView}
                getViewerKey={getViewerKey}
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
                onOpenArticle={openArticlePage}
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
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting("wish")}
                  startIcon={getSubmitProgress("wish")}
                >
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
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting("offer")}
                  startIcon={getSubmitProgress("offer")}
                >
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
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting("site-visit")}
                  startIcon={getSubmitProgress("site-visit")}
                >
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
                  required
                />
                <TextField
                  label="Password"
                  type={showLoginPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm({ ...loginForm, password: event.target.value })
                  }
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showLoginPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            edge="end"
                            onClick={() =>
                              setShowLoginPassword((current) => !current)
                            }
                          >
                            {showLoginPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting("login")}
                  startIcon={getSubmitProgress("login")}
                >
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
                  label="Username"
                  value={signupForm.username}
                  onChange={(event) =>
                    setSignupForm({
                      ...signupForm,
                      username: event.target.value,
                    })
                  }
                  required
                  error={signupAvailability.username.available === false}
                  helperText={
                    signupAvailability.username.checking
                      ? "Checking username..."
                      : signupAvailability.username.message
                  }
                  color={
                    signupAvailability.username.available ? "success" : "primary"
                  }
                />
                <TextField
                  label="First name"
                  value={signupForm.first_name}
                  onChange={(event) =>
                    setSignupForm({
                      ...signupForm,
                      first_name: event.target.value,
                    })
                  }
                  required
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
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  value={signupForm.email}
                  onChange={(event) =>
                    setSignupForm({ ...signupForm, email: event.target.value })
                  }
                  required
                  error={signupAvailability.email.available === false}
                  helperText={
                    signupAvailability.email.checking
                      ? "Checking email..."
                      : signupAvailability.email.message
                  }
                  color={signupAvailability.email.available ? "success" : "primary"}
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
                  required
                  error={signupAvailability.phone_number.available === false}
                  helperText={
                    signupAvailability.phone_number.checking
                      ? "Checking mobile number..."
                      : signupAvailability.phone_number.message
                  }
                  color={
                    signupAvailability.phone_number.available
                      ? "success"
                      : "primary"
                  }
                />
                <TextField
                  label="Password"
                  type={showSignupPassword ? "text" : "password"}
                  value={signupForm.password}
                  onChange={(event) =>
                    setSignupForm({
                      ...signupForm,
                      password: event.target.value,
                    })
                  }
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showSignupPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            edge="end"
                            onClick={() =>
                              setShowSignupPassword((current) => !current)
                            }
                          >
                            {showSignupPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting("signup")}
                  startIcon={getSubmitProgress("signup")}
                >
                  Submit application
                </Button>
              </div>
            </Box>
          ) : null}

          {drawerMode === "profile" ? renderProfileFormContent() : null}
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

function AgentProfilePanel({
  user,
  listings,
  wishes,
  onCreateListing,
}: {
  user: User;
  listings: Listing[];
  wishes: Wish[];
  onCreateListing: () => void;
}) {
  const displayName =
    user.full_name ||
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    user.email;
  const username = user.email.split("@")[0] || displayName.replace(/\s+/g, "");
  const profileFields = [
    user.first_name,
    user.last_name,
    user.phone_number,
    user.address,
    user.district,
    user.village,
    user.experience,
    user.nationality,
  ];
  const completedFields = profileFields.filter(Boolean).length;
  const totalViews = listings.reduce(
    (sum, listing) => sum + listing.total_views,
    0,
  );
  const approvedListings = listings.filter(
    (listing) => listing.approval_status === "approved",
  ).length;
  const rejectedListings = listings.filter(
    (listing) => listing.approval_status === "rejected",
  ).length;
  const totalSales = listings.reduce(
    (sum, listing) => sum + (listing.total_sales ?? 0),
    0,
  );
  const forwardedWishes = wishes.filter((wish) =>
    wish.status.toLowerCase().includes("forward"),
  );

  return (
    <div className="agent-summary-grid">
      <Card className="priority-card agent-profile-panel" elevation={2}>
        <div className="agent-profile-main">
          <CardMedia
            component="img"
            className="agent-profile-avatar"
            image={resolveAgentImage(user.profile_picture, user.id)}
            alt={displayName}
          />
          <div className="agent-profile-copy">
            <div className="agent-profile-title-row">
              <div>
                <div className="agent-card-title-copy">
                  <Typography variant="h4">{displayName}</Typography>
                  {user.status === "approved" || user.status === "active" ? (
                    <VerifiedIcon
                      className="agent-verified-icon"
                      fontSize="small"
                    />
                  ) : null}
                </div>
                <Typography color="text.secondary">@{username}</Typography>
              </div>
            </div>
            <div className="agent-profile-details">
              <Chip
                icon={<EmailOutlinedIcon fontSize="small" />}
                label={user.email}
              />
              <Chip
                icon={<PhoneOutlinedIcon fontSize="small" />}
                label={user.phone_number || "No phone number"}
              />
              <Chip
                icon={<PlaceOutlinedIcon fontSize="small" />}
                label={
                  [user.village, user.district].filter(Boolean).join(", ") ||
                  "Location not added"
                }
              />
              <Chip label={`Address: ${user.address || "Not added"}`} />
              <Chip label={`Experience: ${user.experience || "Not added"}`} />
              <Chip label={`Nationality: ${user.nationality || "Not added"}`} />
            </div>
          </div>
        </div>
        <Divider />
        <div className="agent-profile-actions">
          <Chip
            label={`Profile ${completedFields}/${profileFields.length} complete`}
            color={
              completedFields === profileFields.length ? "success" : "warning"
            }
          />
        </div>
      </Card>

      <div className="agent-analytics-column">
        <Card className="priority-card agent-analytics-panel" elevation={2}>
          <div className="agent-section-header">
            <div>
              <Typography variant="h5">Profile Analytics</Typography>
              <Typography color="text.secondary">
                A quick view of your listing activity.
              </Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<HomeWorkIcon />}
              onClick={onCreateListing}
            >
              Create listing
            </Button>
          </div>
          <div className="agent-profile-stats">
            <Card className="agent-mini-stat" elevation={2}>
              <div className="agent-mini-stat-title">
                <HomeWorkIcon className="agent-mini-stat-icon" />
                <Typography color="text.secondary">Total Listings</Typography>
              </div>
              <Typography variant="h5">{listings.length}</Typography>
            </Card>
            <Card className="agent-mini-stat" elevation={2}>
              <div className="agent-mini-stat-title">
                <CheckCircleOutlineOutlinedIcon className="agent-mini-stat-icon" />
                <Typography color="text.secondary">
                  Approved Listings
                </Typography>
              </div>
              <Typography variant="h5">{approvedListings}</Typography>
            </Card>
            <Card className="agent-mini-stat" elevation={2}>
              <div className="agent-mini-stat-title">
                <CancelIcon className="agent-mini-stat-icon" />
                <Typography color="text.secondary">
                  Rejected Listings
                </Typography>
              </div>
              <Typography variant="h5">{rejectedListings}</Typography>
            </Card>
            <Card className="agent-mini-stat" elevation={2}>
              <div className="agent-mini-stat-title">
                <VisibilityOutlinedIcon className="agent-mini-stat-icon" />
                <Typography color="text.secondary">Total Views</Typography>
              </div>
              <Typography variant="h5">{totalViews}</Typography>
            </Card>
            <Card className="agent-mini-stat" elevation={2}>
              <div className="agent-mini-stat-title">
                <SellIcon className="agent-mini-stat-icon" />
                <Typography color="text.secondary">Total Sales</Typography>
              </div>
              <Typography variant="h5">{totalSales}</Typography>
            </Card>
          </div>
        </Card>

        <Card
          className="priority-card agent-forwarded-wishes-panel"
          elevation={2}
        >
          <div className="agent-section-header">
            <div>
              <Typography variant="h5">Forwarded wishes</Typography>
              <Typography color="text.secondary">
                Customer requests forwarded to your profile.
              </Typography>
            </div>
            <Chip
              icon={<FavoriteIcon fontSize="small" />}
              label={forwardedWishes.length}
              color="warning"
            />
          </div>
          {forwardedWishes.length ? (
            <div className="agent-forwarded-wishes-list">
              {forwardedWishes.slice(0, 4).map((wish) => (
                <Card
                  key={wish.id}
                  className="agent-forwarded-wish"
                  variant="outlined"
                >
                  <Typography variant="h6">{wish.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {[wish.village, wish.district].filter(Boolean).join(", ") ||
                      "Location not added"}
                  </Typography>
                  <div className="agent-forwarded-wish-meta">
                    <Chip size="small" label={wish.purpose || "Any purpose"} />
                    <Chip
                      size="small"
                      variant="outlined"
                      label={wish.price_range || "Any budget"}
                    />
                    <Chip
                      size="small"
                      variant="outlined"
                      label={wish.size_range || "Any size"}
                    />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Box className="agent-forwarded-wishes-empty">
              <Typography variant="h6">No forwarded wishes yet.</Typography>
              <Typography color="text.secondary">
                Forwarded customer wishes will appear here.
              </Typography>
            </Box>
          )}
        </Card>
      </div>
    </div>
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
  onOpenArticle,
}: {
  listing: Listing;
  authorName: string;
  authorApproved: boolean;
  offerCount: number;
  siteVisitCount: number;
  onRegisterView: (listingId: number) => void;
  onOpenActions: (event: MouseEvent<HTMLElement>, listing: Listing) => void;
  onOpenArticle: (listing: Listing) => void;
}) {
  const statusLabel = getListingStatusLabel(listing);

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
      {statusLabel ? (
        <div className="listing-sold-ribbon">{statusLabel}</div>
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
            className="listing-amount-chip"
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
          <Chip label={`${offerCount} Offers`} size="small" color="warning" />
          <Chip
            label={`${siteVisitCount} Site Visits`}
            size="small"
            variant="outlined"
          />
          <Button
            size="small"
            variant="outlined"
            onClick={() => onOpenArticle(listing)}
          >
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
