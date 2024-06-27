import TitleRenderer from './TitleRenderer';
import ParagraphRenderer from './ParagraphRenderer';
import DivRenderer from './DivRenderer';
import LoginPanelRenderer from './LoginPanelRenderer';
import PageRenderer from './PageRenderer';
import WellRenderer from './WellRenderer';
import UserExplorerRenderer from './UserExplorerRenderer';
import ImageRenderer from './ImageRenderer';
import LinkRenderer from './LinkRenderer';
import BackLinkRenderer from './BackLinkRenderer';
import RegisterPanelRenderer from './RegisterPanelRenderer';
import ResetPasswordRequestPanelRenderer from './ResetPasswordRequestPanelRenderer';
import ResetPasswordPanelRenderer from './ResetPasswordPanelRenderer';
import AccordionItemHeaderRenderer from './AccordionItemHeaderRenderer';
import InsetTextRenderer from './InsetTextRenderer';
import AccordionItemRenderer from './AccordionItemRenderer';
import WarningRenderer from './WarningRenderer';
import ColumnRenderer from './ColumnRenderer';
import RowRenderer from './RowRenderer';
import CellRenderer from './CellRenderer';
import TableRenderer from './TableRenderer';
import BadgeRenderer from './BadgeRenderer';
import AccordionRenderer from './AccordionRenderer';
import CardHeaderRenderer from './CardHeaderRenderer';
import CardBodyRenderer from './CardBodyRenderer';
import CardFooterRenderer from './CardFooterRenderer';
import CardRenderer from './CardRenderer';
import IconRenderer from './IconRenderer';
import ToolTipRenderer from './ToolTipRenderer';
import ListItemBinder from './ListItemBinder';
import ListRenderer from './ListRenderer';
import CookieConsentRenderer from './CookieConsentRenderer';
import FakeStoreBinderRenderer from './FakeStoreBinderRenderer';
import ErrorSummaryRenderer from './ErrorSummaryRenderer';
import InputRenderer from './InputRenderer';
import EnumerationInputRenderer from './EnumerationInputRenderer';
import ValueRenderer from './ValueRenderer';
import ScaleRenderer from './ScaleRenderer';
import ButtonRenderer from './ButtonRenderer';
import JumbotronRenderer from './JumbotronRenderer';
import CarouselRenderer from './CarouselRenderer';
import CarouselPanelRenderer from './CarouselPanelRenderer';
import ProgressBarRenderer from './ProgressBarRenderer';
import FormRenderer from './FormRenderer';
import WizardTestResultsRenderer from './WizardTestResultsRenderer';
import ConfirmWorkflowPanelRenderer from './ConfirmWorkflowPanelRenderer';
import CloseWorkflowExecutedPanelRenderer from './CloseWorkflowExecutedPanelRenderer';
import FakeUserRenderer from './FakeUserRenderer';
import FakeMessageRenderer from './FakeMessageRenderer';
import FakeWizardRenderer from './FakeWizardRenderer';
import FakeWorkflowRenderer from './FakeWorkflowRenderer';
import MileStoneRenderer from './MileStoneRenderer';
import FakePageRenderer from './FakePageRenderer';
import HorizontalRuleRenderer from './HorizontalRuleRenderer';
import InitiateWorkflowButtonRenderer from './InitiateWorkflowButtonRenderer';
import MenuRenderer from './MenuRenderer';
import MenuBrandBinder from './MenuBrandBinder';
import MenuItemBinder from './MenuItemBinder';
import SubMenuRenderer from './SubMenuRenderer';
import SubMenuLabelBinder from './SubMenuLabelBinder';
import TrayRenderer from './TrayRenderer';
import TrayHeaderBinder from './TrayHeaderBinder';
import FakeQueueBinder from './FakeQueueRenderer';
import MessageExplorerRenderer from './MessageExplorerRenderer';
import NotificationBannerRenderer from './NotificationBannerRenderer';
import EmailRenderer from './EmailRenderer';
import EmailConfirmationLinkRenderer from './EmailConfirmationLinkRenderer';
import PasswordResetLinkRenderer from './PasswordResetLinkRenderer';
import ConfirmationPanelRenderer from './ConfirmationPanelRenderer';
import BrRenderer from './BrRenderer';
import SpanRenderer from './SpanRenderer';
import UuidRenderer from './UuidRenderer';
import ScriptBinder from './ScriptRenderer';
import LoopRenderer from './LoopRenderer';
import SwitchRenderer from './SwitchRenderer';
import FakeGroupBinder from './FakeGroupRenderer';

const registry = [
    new TitleRenderer(),
    new ParagraphRenderer(),
    new DivRenderer(),
    new LoginPanelRenderer(),
    new WellRenderer(),
    new UserExplorerRenderer(),
    new ImageRenderer(),
    new LinkRenderer(),
    new BackLinkRenderer(),
    new RegisterPanelRenderer(),
    new PageRenderer(),
    new ResetPasswordRequestPanelRenderer(),
    new ResetPasswordPanelRenderer(),
    new AccordionItemHeaderRenderer(),
    new InsetTextRenderer(),
    new AccordionItemRenderer(),
    new WarningRenderer(),
    new ColumnRenderer(),
    new RowRenderer(),
    new CellRenderer(),
    new TableRenderer(),
    new BadgeRenderer(),
    new AccordionRenderer(),
    new CardHeaderRenderer(),
    new CardBodyRenderer(),
    new CardFooterRenderer(),
    new CardRenderer(),
    new IconRenderer(),
    new ToolTipRenderer(),
    new ListItemBinder(),
    new ListRenderer(),
    new CookieConsentRenderer(),
    new FakeStoreBinderRenderer(),
    new ErrorSummaryRenderer(),
    new InputRenderer(),
    new EnumerationInputRenderer(),
    new ValueRenderer(),
    new ScaleRenderer(),
    new ButtonRenderer(),
    new JumbotronRenderer(),
    new CarouselRenderer(),
    new CarouselPanelRenderer(),
    new ProgressBarRenderer(),
    new FormRenderer(),
    new WizardTestResultsRenderer(),
    new ConfirmWorkflowPanelRenderer(),
    new CloseWorkflowExecutedPanelRenderer(),
    new FakeUserRenderer(),
    new FakeMessageRenderer(),
    new FakeWizardRenderer(),
    new FakeWorkflowRenderer(),
    new FakePageRenderer(),
    new FakeQueueBinder(),
    new FakeGroupBinder(),
    new MileStoneRenderer(),
    new HorizontalRuleRenderer(),
    new InitiateWorkflowButtonRenderer(),
    new MenuRenderer(),
    new MenuBrandBinder(),
    new MenuItemBinder(),
    new SubMenuRenderer(),
    new SubMenuLabelBinder(),
    new TrayRenderer(),
    new TrayHeaderBinder(),
    new MessageExplorerRenderer(),
    new NotificationBannerRenderer(),
    new EmailRenderer(),
    new EmailConfirmationLinkRenderer(),
    new PasswordResetLinkRenderer(),
    new ConfirmationPanelRenderer(),
    new BrRenderer(),
    new SpanRenderer(),
    new UuidRenderer(),
    new ScriptBinder(),
    new LoopRenderer(),
    new SwitchRenderer()
];

export function findBinder(name: string) {
    return registry.find(builtin => builtin.accept(name));
}