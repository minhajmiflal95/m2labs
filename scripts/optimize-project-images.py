"""Optional asset reproduction: Python 3 + Pillow; not needed by npm build."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
pairs = {
    'retail_inventory_pos_showcase': 'retail-inventory-pos',
    'sri_lankan_tourism_booking_showcase': 'tourism-booking',
    'sme_cloud_infrastructure_portfolio': 'sme-cloud-infrastructure',
    'sri_lankan_gems_digital_growth': 'local-business-digital-growth',
    'erp_integration_dashboard_showcase': 'erp-inventory-integration',
    'university_research_dashboard_mockup': 'university-research-ml',
}
output = root / 'public/images/projects'
output.mkdir(parents=True, exist_ok=True)
for source, destination in pairs.items():
    with Image.open(root / 'assets/project-sources' / f'{source}.png') as image:
        assert image.size == (1448, 1086), 'Review responsive dimensions if the source changes'
        for width in (480, 800, 1448):
            suffix = '' if width == 1448 else f'-{width}'
            image.convert('RGB').resize((width, width * 3 // 4), Image.Resampling.LANCZOS).save(
                output / f'{destination}{suffix}.webp', 'WEBP', quality=86, method=6,
            )
