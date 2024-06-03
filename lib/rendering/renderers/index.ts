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
import ListItemRenderer from './ListItemRenderer';
import ListRenderer from './ListRenderer';
import CookieConsentRenderer from './CookieConsentRenderer';
import FakeStoreRenderer from './FakeStoreRenderer';
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
import MenuBrandRenderer from './MenuBrandRenderer';
import MenuItemRenderer from './MenuItemRenderer';
import SubMenuRenderer from './SubMenuRenderer';
import SubMenuLabelRenderer from './SubMenuLabelRenderer';
import TrayRenderer from './TrayRenderer';
import TrayHeaderRenderer from './TrayHeaderRenderer';
import FakeQueueRenderer from './FakeQueueRenderer';
import MessageExplorerRenderer from './MessageExplorerRenderer';
import NotificationBannerRenderer from './NotificationBannerRenderer';
import EmailRenderer from './EmailRenderer';
import EmailConfirmationLinkRenderer from './EmailConfirmationLinkRenderer';
import PasswordResetLinkRenderer from './PasswordResetLinkRenderer';
import ConfirmationPanelRenderer from './ConfirmationPanelRenderer';
import BrRenderer from './BrRenderer';
import SpanRenderer from './SpanRenderer';
import UuidRenderer from './UuidRenderer';
import ScriptRenderer from './ScriptRenderer';
import LoopRenderer from './LoopRenderer';
import SwitchRenderer from './SwitchRenderer';
import FakeGroupRenderer from './FakeGroupRenderer';
import WizardIntroPanelRenderer from './WizardIntroPanelRenderer';
import WizardOutroPanelRenderer from './WizardOutroPanelRenderer';
import WizardResumePanelRenderer from './WizardResumePanelRenderer';

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
    new ListItemRenderer(),
    new ListRenderer(),
    new CookieConsentRenderer(),
    new FakeStoreRenderer(),
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
    new FakeQueueRenderer(),
    new FakeGroupRenderer(),
    new MileStoneRenderer(),
    new HorizontalRuleRenderer(),
    new InitiateWorkflowButtonRenderer(),
    new MenuRenderer(),
    new MenuBrandRenderer(),
    new MenuItemRenderer(),
    new SubMenuRenderer(),
    new SubMenuLabelRenderer(),
    new TrayRenderer(),
    new TrayHeaderRenderer(),
    new MessageExplorerRenderer(),
    new NotificationBannerRenderer(),
    new EmailRenderer(),
    new EmailConfirmationLinkRenderer(),
    new PasswordResetLinkRenderer(),
    new ConfirmationPanelRenderer(),
    new BrRenderer(),
    new SpanRenderer(),
    new UuidRenderer(),
    new ScriptRenderer(),
    new LoopRenderer(),
    new SwitchRenderer(),
    new WizardIntroPanelRenderer(),
    new WizardOutroPanelRenderer(),
    new WizardResumePanelRenderer()
];

export function findRenderer(name: string) {
    return registry.find(builtin => builtin.accept(name));
}