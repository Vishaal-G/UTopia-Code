# map_markers.py
from ut_locations import get_ut_locations
class MapMarkers:
    def __init__(self):
        self.markers = get_ut_locations()

    def add_marker(self, latitude, longitude, popup_text=''):
        marker = {
            'latitude': latitude,
            'longitude': longitude,
            'popup_text': popup_text
        }
        self.markers.append(marker)

    def remove_marker(self, latitude, longitude):
        before_count = len(self.markers)
        self.markers = [
            marker for marker in self.markers
            if marker['latitude'] != latitude or marker['longitude'] != longitude
        ]
        after_count = len(self.markers)
        if before_count == after_count:
            print(f"No marker found at ({latitude}, {longitude}) to remove.")
        else:
            print(f"Removed marker at ({latitude}, {longitude})")

    def list_markers(self, search_term=''):
        if search_term:
            return [
                marker for marker in self.markers
                if search_term.lower() in marker['popup_text'].lower()
            ]
        return self.markers
